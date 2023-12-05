$(() => {
	$(window).trigger("resize")
	$(window).resize(() => {
		if($(window).width() < 1200)
			$("#candidates_box").addClass("flex-wrap")
		else
			$("#candidates_box").removeClass("flex-wrap")
	})
})
