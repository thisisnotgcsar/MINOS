import * as paillier from './paillier-bigint.esm.js'

const getCandidatePower = (i) => Math.pow(election.base, i)

async function updateElection(election_json) {
	if(election_json == null)
		await $.get("/getElection", (json) => election_json = json, "text")
	election = jsonBigInt.deserialize(election_json)
	console.log(election)
	publicKey = new paillier.PublicKey(election.publicKey.n, election.publicKey.g)
	updateProgress()
}

async function updateCurrentResults(results) {
	if(results == null)
		await $.get("/current_results", (results) => currentResults = results)
	resultsChart.data.datasets[0].data = currentResults
	resultsChart.update()
	console.log("chart updated")
}

function fill_candidates(){
	$("#candidates_box").empty()
	election.candidates.forEach(function(candidate, i) {
		const element = "<div class='d-flex flex-column align-items-center candidate-box'><h2>"+candidate+"</h2><input class='form-check-input position-static' type='radio' name='candidate_radio' value="+getCandidatePower(i+1)+" aria-label="+candidate+"></div>"
		$("#candidates_box").append(element)
	})
}

function updateProgress() {
	const percentage = election.current_weights_sum / election.weights_sum * 100
	$("#progress").css("width", percentage+"%").attr("aria-valuenow", percentage)
	$("#progress_label").text(percentage+"% ballots casted")
}

function fill_info() {
	$("#collapse_info").empty()
	$("#collapse_info").append("<div><span class='fw-bolder'><mark>n</mark>:</span>"+publicKey.n.toString()+"</div>")
	$("#collapse_info").append("<div><span class='fw-bolder'><mark>g</mark>:</span>"+publicKey.g.toString()+"</div>")
	$("#collapse_info").append("<div><span class='fw-bolder'><mark>n<sup>2</sup></mark>:</span>"+publicKey._n2.toString()+"</div>")
	$("#collapse_info").append("<div><span class='fw-bolder'><mark>base</mark>:</span>"+election.base+"</div>")
	$("#collapse_info").append("<div><span class='fw-bolder'><mark>current_votes_sum</mark>:</span>"+election.current_votes_sum.toString()+"</div>")
}

async function getElectionResults(){
	await updateElection()
	await updateCurrentResults()
}

let election
let currentResults
let publicKey
let resultsChart

$(() => {
	resultsChart = new Chart(document.getElementById('results_chart').getContext('2d'), {
		type: 'pie',
		data: {
			labels: [],
			datasets: [{
				label: 'Number of Votes',
				data: [],
				backgroundColor: []
			}]
		},
	})

	getElectionResults().then(() => {
		$("#vote_button").text("vote!")
		fill_info()
		fill_candidates()
		resultsChart.data.labels = election.candidates
		resultsChart.data.datasets[0].backgroundColor = election.candidates_colors
		resultsChart.update()
	})
	setInterval(getElectionResults, 1500)

	
	$("#candidates_box").on("click", "div", function() {
		$(this).children("input").prop("checked", true)
		$("#vote_button").prop("disabled", false)
	})

	$("#vote_button").on("click", function() {
		const vote = {
			vote: publicKey.encrypt(BigInt($("input[name=candidate_radio]:checked", "#candidates_box").val())),
			weight: 1,
			id: "giulio"
		}
		$.ajax({
			url: "/vote",
			method: "POST",
			contentType: "text",
			dataType: "text",
			data: jsonBigInt.serialize(vote),
			success: updateElection
		})	
	})

	document.getElementById("collapse_info").addEventListener("show.bs.collapse", function (){ 
		$("#info_a").html("<i class='fas fa-caret-down'></i> Show additional info")
		$("div").first().addClass("h-auto")
	})

	document.getElementById("collapse_info").addEventListener("shown.bs.collapse", function (){
	}) 

	document.getElementById("collapse_info").addEventListener("hidden.bs.collapse", function (){
	})
	
	document.getElementById("collapse_info").addEventListener("hide.bs.collapse", function (){ 
		$("#info_a").html("<i class='fas fa-caret-right'></i> Show additional info")
		$("div").first().removeClass("h-auto")
	})
});
