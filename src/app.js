const express = require("express")
const http = require("http")
const fs = require("fs")
const paillierBigint = require("paillier-bigint")
const jsonBigInt = require("./public/lib/jsonBigInt.js")

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

const { publicKey, privateKey } = paillierBigint.generateRandomKeysSync()
console.log("Keys generated")

const election = jsonBigInt.deserialize(fs.readFileSync(0))
election.publicKey = { "n": /*123n*/ publicKey.n, "g": /*123n*/publicKey.g }
election.base = election.weights_sum + 1
election.open = true
election.current_weights_sum = 0
election.current_votes_sum = /*0n*/ publicKey.encrypt(0n)
console.log("election json generated!")

const ballots = []

//rendo pubblica la directory public
app.use(express.static(__dirname + "/public/"));

function checkElection(req, res, next) {
	if (election.current_weights_sum == election.weights_sum) {
		election.open = false
		console.log("election closed")
		electionUpdate(req, res)
	}
	else next()
}


function processBallot(req, res, next) {
	let data = ''
	req.on('data', (chunk) => data += chunk)
	req.on('end', function () {
		const ballot = jsonBigInt.deserialize(data)
		ballot.vote = publicKey.multiply(ballot.vote, BigInt(ballot.weight))
		ballots.push(ballot)
		election.current_weights_sum += ballot.weight
		election.current_votes_sum = publicKey.addition(election.current_votes_sum, ballot.vote)
		next()
	});
}

function countBallots(req, res, next) {
	const current_results = new Array(election.candidates.length).fill(0)
	let decrypted_current_votes_sum = parseInt(privateKey.decrypt(election.current_votes_sum))
	for (let i = election.candidates.length; i > 0; i--) {
		const divisor = Math.pow(election.base, i)
		current_results[i - 1] = Math.floor(decrypted_current_votes_sum / divisor)
		decrypted_current_votes_sum = decrypted_current_votes_sum % divisor
	}
	res.send(current_results)
}

function electionUpdate(req, res) {
	res.send(jsonBigInt.serialize(election))
}

function getBallotBox(req, res, next) {
	res.contentType("json")
	res.send(jsonBigInt.serialize(ballots))
}

//se arriva una richiesta alla pagina principale invio la pagina html
app.get('/', (req, res) => res.sendFile(__dirname + "/public/views/index.html"));

app.get("/getElection", electionUpdate)

app.get("/current_results", countBallots)

app.get("/ballot_box", getBallotBox)

app.post("/vote", checkElection)
app.post("/vote", processBallot)
app.post("/vote", checkElection)
app.post("/vote", electionUpdate)

server.listen(port, () => console.log(`Server on port: ${port}.`));

//TODO: il voto è peso*potenza invece dovrebbe essere peso*(potenza precedente)
// non serve cambiare il behavior del conteggio o dell'invio, basta mettere le potenze precedenti nei valori dell'input
// forse devi modificare l'ultima iterazione del conteggio
// ci sono da rifare anche le immaigni la scala logaritmica deve partire da 1 
// riguarda anche le formule


