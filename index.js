const express = require('express');
const { ExpressPeerServer } =require("peer");
const http = require("http");
const dotenv= require('dotenv');
dotenv.config();
const app = express();
const cors= require('cors');
app.use(cors(
{
    origin: `${process.env.FRONTEND_URL}`,
}
));

const server = http.createServer(app);
const customGenerationFunction = () =>
	(Math.random().toString(36) + "0000000000000000000").substring(2, 18);

const peerServer = ExpressPeerServer(server, {
	debug: true,
	path: "/myapp",
    generateClientId: customGenerationFunction,
});

app.use("/peerjs", peerServer);

server.listen(8080, ()=>{

	console.log("Server is running on port 8080");
});