import { deleteMoney, checkRemoveAddClass, noMoney, getRandom, addMoney, getRandom_2 } from './functions.js';
import { initStartData, writeCurrentBet, movePlane, startFlyGame, resetFlyGame, stopFlyGame, configFlyGame } from './script.js';
import { startGame, resetGame, stopAnimation, config_game, autoMode } from './aviator.js';
import { configSlot } from './slot.js';
import { startData } from './startData.js';

const preloader = document.querySelector('.preloader');

// Объявляем слушатель событий "клик"

document.addEventListener('click', (e) => {
	initStartData();

	let targetElement = e.target;

	const preloader = document.querySelector('.preloader');
	const wrapper = document.querySelector('.wrapper');

	const money = +sessionStorage.getItem('money');
	const currentBet = +sessionStorage.getItem('current-bet');

	if (targetElement.closest('[data-btn="privacy"]') && preloader.classList.contains('_hide')) {
		preloader.classList.remove('_hide');
	}

	if (targetElement.closest('.preloader__button')) {
		preloader.classList.add('_hide');
		sessionStorage.setItem('privacy', true);
	}

	if (targetElement.closest('[data-btn="aviator"]')) {
		wrapper.classList.add('_aviator');
	}

	if (targetElement.closest('[data-btn="fly"]')) {
		wrapper.classList.add('_fly');
		setTimeout(() => {
			startFlyGame();
		}, 250);
	}

	if (targetElement.closest('[data-btn="slot"]')) {
		wrapper.classList.add('_slot');
	}

	if (targetElement.closest('[data-btn="avia-home"]')) {
		wrapper.classList.remove('_aviator');

		// reset game
		if (config_game.state !== 1) {
			stopAnimation();

			setTimeout(() => {
				resetGame();
			}, 2000);
		}
	}

	if (targetElement.closest('[data-btn="fly-home"]')) {
		wrapper.classList.remove('_fly');
		configFlyGame.state = 1;
		stopFlyGame();
	}

	if (targetElement.closest('[data-btn="slot-home"]')) {
		wrapper.classList.remove('_slot');
		// reset auto mode
		if (configSlot.isAutMode) {
			if (configSlot.isAutMode) {
				clearInterval(configSlot.autospin);
				configSlot.isAutMode = false;

				document.querySelector('[data-btn="slot-start"]').classList.remove('_hold');
				document.querySelector('.controls-slot__auto').classList.remove('_hold');
				document.querySelector('.actions-controls__score-box._bet').classList.remove('_hold');
			}
		}
	}

	//aviator

	if (targetElement.closest('[data-btn="bet-down"]') && currentBet > startData.countBet) {
		sessionStorage.setItem('current-bet', currentBet - startData.countBet);
		writeCurrentBet();
	}

	if (targetElement.closest('[data-btn="bet-up"]') && money > currentBet + startData.countBet && currentBet < startData.maxBet) {
		sessionStorage.setItem('current-bet', currentBet + startData.countBet);
		writeCurrentBet();
	}

	if (targetElement.closest('[data-btn="aviator-start"]') && config_game.state === 2) {
		stopAnimation();
		config_game.state = 3;
		document.querySelector('[data-btn="aviator-start"]').classList.add('_hold');
		setTimeout(() => {
			resetGame();
		}, 2000);
		addMoney(config_game.current_win, '.score', 1000, 2000);
	}

	if (targetElement.closest('[data-btn="aviator-start"]') && config_game.state === 1) {
		startGame();
	}

	if (targetElement.closest('[data-footer-button="bet"]')) {
		if (!targetElement.closest('[data-footer-button="bet"]').classList.contains('_active')) {
			checkRemoveAddClass('.footer__button', '_active', targetElement.closest('[data-footer-button="bet"]'));
		}
	}
	if (targetElement.closest('[data-footer-button="auto"]')) {
		checkRemoveAddClass('.footer-avia__button', '_active', targetElement.closest('[data-footer-button="auto"]'));
		document.querySelector('.block-bet').classList.add('_hold');
		autoMode();
	}

	// fly
	if (targetElement.closest('[data-btn="fly-left"]')) {
		movePlane('left');
	}

	if (targetElement.closest('[data-btn="fly-right"]')) {
		movePlane('right');
	}

	//===
	if (targetElement.closest('.final__button') && document.querySelector('.final').classList.contains('_visible')) {
		document.querySelector('.final').classList.remove('_visible');
		if (wrapper.classList.contains('_fly')) {
			resetFlyGame();
		}
	}
})
