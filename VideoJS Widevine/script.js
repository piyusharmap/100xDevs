const chaptersToggle = document.getElementById("chapter-ctrl-btn");
const chaptersContainer = document.getElementById("chapters-container");
const videoShowcase = document.getElementById("vid-showcase");

document.addEventListener("keydown", function (event) {
	switch (event.key) {
		case " ":
			if (player.paused()) {
				player.play();
			} else {
				player.pause();
			}
			break;
		case "ArrowLeft":
			console.log(player.currentTime());
			scrollToSegment(player, player.currentTime() - 10);
			break;
		case "ArrowRight":
			scrollToSegment(player, player.currentTime() + 10);
			break;
		default:
			break;
	}
});

chaptersToggle.addEventListener("click", function () {
	chaptersToggle.blur();
	if (
		chaptersContainer.style.display === "none" ||
		chaptersContainer.style.display === ""
	) {
		chaptersContainer.style.display = "block";
		chaptersToggle.innerText = "Hide Chapters";
	} else {
		chaptersContainer.style.display = "none";
		chaptersToggle.innerText = "Show Chapters";
	}
});

let videoInfo = {
	title: "Random Video Name",
	duration: 210,
	segements: [
		{
			title: "Chapter 1",
			start: 0,
			end: 45,
		},
		{
			title: "Chapter 2",
			start: 45,
			end: 130,
		},
		{
			title: "Chapter 3",
			start: 130,
			end: 200,
		},
		{
			title: "Chapter 4",
			start: 200,
			end: 210,
		},
	],
};

let segments = [
	{
		title: "Chapter 1",
		start: 0,
	},
	{
		title: "Chapter 2",
		start: 45,
	},
	{
		title: "Chapter 3",
		start: 130,
	},
	{
		title: "Chapter 4",
		start: 200,
	},
];

var player = videojs(
	"my-video",
	{
		controls: true,
		fluid: true,
		html5: {
			vhs: {
				overrideNative: true,
			},
		},
	},
	function () {
		var player = this;
		player.eme();
		player.src({
			src: "https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd",
			type: "application/dash+xml",
			keySystems: {
				"com.widevine.alpha":
					"https://cwip-shaka-proxy.appspot.com/no_auth",
			},
		});

		player.on("loadedmetadata", function () {
			segments.forEach(function (segment, index) {
				segment.leftMargin = (segment.start / player.duration()) * 100;
			});

			addSegmentControls(player);
			addSegmentTitles(player);
		});

		player.ready(function () {
			player.tech(true).on("keystatuschange", function (event) {
				// console.log("event: ", event);
			});
		});
	}
);

function addSegmentTitles(player) {
	const chapterTitle = document.getElementById("chapter-titles");

	segments.forEach(function (segment, index) {
		const title = document.createElement("li");

		title.innerHTML = segment.title;
		title.style.fontSize = "1rem";
		title.style.padding = "0.5rem";
		title.style.listStyle = "none";
		title.style.cursor = "pointer";

		title.addEventListener("click", function () {
			scrollToSegment(player, segment.start);
		});

		chapterTitle.appendChild(title);
	});
}

function addSegmentControls(player) {
	var seekBar = player.controlBar.progressControl.seekBar;

	videoInfo.segements.forEach(function (segment) {
		const segmentButton = document.createElement("button");
		segmentButton.classList.add("chapter-break");

		segmentButton.style.height = "100%";
		segmentButton.style.width =
			(segment.end / videoInfo.duration) * 100 -
			(segment.start / videoInfo.duration) * 100 +
			"%";
		segmentButton.style.position = "absolute";
		segmentButton.style.left =
			(segment.start / videoInfo.duration) * 100 + "%";
		segmentButton.style.border = "none";

		segmentButton.addEventListener("click", function () {
			scrollToSegment(player, segment.start);
		});

		seekBar.el().appendChild(segmentButton);
	});
}

function scrollToSegment(player, startTime) {
	player.currentTime(startTime);
	player.play();
}
