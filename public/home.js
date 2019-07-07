function getModeInfo() {
	console.log("Retrieving mode info...");

	var modeCode = $('#modeSelect').val();
	console.log(modeCode);

	$.get("/modeInfo", {modeCode:modeCode}, function(data) {
		console.log("Back from server with:" + data);

		for (var i = 0; i < data.list.length; i++) {
			var tone = data.list[i];

			$("")
		}
	})

}
