chrome.commands.onCommand.addListener((command) => {
	if (command === 'click-button') {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const currentTab = tabs[0];
			const tabId = tabs[0].id;
			if (currentTab.url.includes('leetcode.com')) {
				chrome.scripting.executeScript({
					target: { tabId: tabId },
					func: clickFirstButton,
				});

				setTimeout(() => {
					chrome.scripting.executeScript({
						target: { tabId: tabId },
						func: clickSecondButton,
					});
				}, 200);
			}
		});
	}
});

const clickFirstButton = () => {
	const firstButtons = document.querySelectorAll(
		'button[data-state="closed"].relative.inline-flex.gap-2.items-center.justify-center.font-medium.cursor-pointer.focus-visible\\:outline-none.disabled\\:cursor-not-allowed.disabled\\:opacity-50.transition-colors.bg-transparent.enabled\\:hover\\:bg-fill-secondary.enabled\\:active\\:bg-fill-primary.text-caption.rounded.text-text-primary.group.ml-auto.p-1'
	);

	if (firstButtons.length === 4) {
		firstButtons[3].click();
	} else if (firstButtons.length === 3) {
		firstButtons[2].click();
	}
};

const clickSecondButton = () => {
	const secondButtons = Array.from(
		document.querySelectorAll(
			'.px-3.py-1\\.5.font-medium.items-center.whitespace-nowrap.focus\\:outline-none.inline-flex.text-label-r.bg-green-s.dark\\:bg-dark-green-s.hover\\:bg-green-3.dark\\:hover\\:bg-dark-green-3.rounded-lg'
		)
	);
	const confirmButton = secondButtons.find(
		(button) => button.textContent.trim() === 'Confirm'
	);
	if (confirmButton) {
		confirmButton.click();
	}
};
