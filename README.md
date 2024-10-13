
<p align="center">
  <img src="./doc/assets/Minosse_logo.PNG" alt="Minosse">
  <br>
    <em>MINOSSE logo</em>
</p>


# MINOSSE
**MINOSSE** (MINOS in english, name inspired by the famous character in Dante's work) is a web-based, client-server application for electronic voting, real-time data collection, votes counting, and multi-candidate elections.

It uses the [Paillier](https://en.wikipedia.org/wiki/Paillier_cryptosystem) semi-homomorphic cryptographic scheme to anonymously collect and count the votes.

It is a purely *demonstrative* application and shouldn't be employed in a production environment by **any means**.
It is NOT a secure system and I do not assume any responsabilities of the usage that you will do of this software.

# Preface
This project was created for my BSc thesis at the University of Bologna (UNIBO) in 2021, and it is archived and no longer maintained. Contributions to this repository are not accepted, but if you want to re-use my code, you can do so under its license constraints (see the LICENSE file).

You can view the documentation in the doc/ directory, where you will also find the PDF of my thesis. The document is available in English and Italian.

# Brief Description
Minosse is a web app that enables electronic (remote) voting. Remote voting poses a current challenge due to its intrinsic requirement for anonymity. Ciphering votes with a robust modern cipher addresses the problem until it's time to decrypt them. Encrypting votes with standard cryptographic schemes only serves to 'move' the problem. Homomorphic cryptographic schemes leverage their intrinsic malleability property to establish a homomorphism (a link) under a certain operation between ciphertexts and plaintexts.

Therefore, specific operations on the ciphertexts can be performed to ensure they will be reflected on the plaintexts in a predictable and reproducible way. The result is a system that can homomorphically count votes without decrypting them.

# Meta
gcsar

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/thisisnotgcsar/MINOS">MINOS</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/thisisnotgcsar">gcsar</a> is licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></a></p>

https://github.com/thisisnotgcsar