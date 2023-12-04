const chaptersToggle = document.getElementById("chapter-ctrl-btn");
const chaptersContainer = document.getElementById("chapters-container");

// video controls using keyboard
document.addEventListener("keydown", function (event) {
	const keyActions = {
		" ": () => togglePlayPause(),
		ArrowRight: () => skipForward(),
		ArrowLeft: () => skipBackward(),
		ArrowUp: () => increaseVolume(),
		ArrowDown: () => reduceVolume(),
		m: () => toggleMute(),
	};

	const action = keyActions[event.key];
	if (action) {
		action();
	}
});

// to toggle play button
function togglePlayPause() {
	if (player.paused()) {
		player.play();
	} else {
		player.pause();
	}
}

// to skip video forward
function skipForward() {
	if (!player.paused()) {
		scrollToSegment(player, player.currentTime() + 10);
	}
}

// to skip video backward
function skipBackward() {
	if (!player.paused()) {
		scrollToSegment(player, player.currentTime() - 10);
	}
}

// to toggle mute button
function toggleMute() {
	if (player.muted()) {
		player.muted(false);
	} else {
		player.muted(true);
	}
}

// to increase volume
function increaseVolume() {
	player.volume(player.volume() + 0.1);
}

// to reduce volume
function reduceVolume() {
	player.volume(player.volume() - 0.1);
}

// to toggle the visibility of chapters container
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

// mock data
let videoInfo = {
	title: "Random Video Name",
	duration: 210,
	segements: [
		{
			title: "Chapter 1",
			start: 0,
			end: 45,
			description: "lorem ipsum lumsum dimsum iloten erihai",
		},
		{
			title: "Chapter 2",
			start: 45,
			end: 130,
		},
		{
			title: "Chapter 3",
			start: 130,
			end: 170,
		},
		{
			title: "Chapter 4",
			start: 170,
			end: 200,
		},
		{
			title: "Chapter 5",
			start: 200,
			end: 210,
		},
	],
};

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
			addChapterControls(player);
			addChapterTitles(player);
		});

		player.ready(function () {
			player.tech(true).on("keystatuschange", function (event) {
				// .log("event: ", event);
			});
		});
	}
);

function addChapterTitles(player) {
	const chapterTitle = document.getElementById("chapter-titles");

	videoInfo.segements.forEach(function (segment) {
		const title = document.createElement("li");
		const titleDuration = document.createElement("span");

		title.innerHTML = segment.title;
		titleDuration.innerText = secondsToTime(segment.start);

		title.addEventListener("click", function () {
			scrollToSegment(player, segment.start);
		});

		chapterTitle.appendChild(title);
		title.appendChild(titleDuration);
	});
}

function addChapterControls(player) {
	var seekBar = player.controlBar.progressControl.seekBar;

	videoInfo.segements.forEach(function (segment) {
		const segmentButton = document.createElement("span");
		segmentButton.classList.add("chapter-break");

		segmentButton.style.width =
			(segment.end / videoInfo.duration) * 100 -
			(segment.start / videoInfo.duration) * 100 +
			"%"; // to calculate the width of chapter
		segmentButton.style.left =
			(segment.start / videoInfo.duration) * 100 + "%"; // to calculate left margin

		seekBar.el().appendChild(segmentButton);
	});
}

// to play the video at a particular time stamp
function scrollToSegment(player, startTime) {
	player.currentTime(startTime);
	player.play();
}

// to change the timestamp to a proper format
function secondsToTime(timestamp) {
	const hours = Math.floor(timestamp / 3600);
	const minutes = Math.floor((timestamp % 3600) / 60);
	const seconds = Math.floor(timestamp % 60);

	let timeFormat = "";

	if (hours > 0) {
		timeFormat += `${hours.toString().padStart(2, "0")}:`;
	}

	timeFormat += `${minutes.toString().padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")}`;
	return timeFormat;
}
