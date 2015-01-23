'use strict';

global.$ = $;

// Load required NodeJS libs
var FlickrImageDownloader = require('flickr-image-downloader');

// Setup flickr downloader instance
var flickrImageDownloader = new FlickrImageDownloader();

// Clientside JS
var $form = $('form'),
	$modal = $('.modal');

$('.form-reset').on('click', function () {
	$form.find('input[type="text"]').each(function () {
		$(this).val(null);
	});
});

$('form').on('submit', function (e) {
	e.preventDefault();
	
	$modal.addClass('open');

	var formData = $(this).serializeObject();
	
	flickrImageDownloader.getImages(formData.username, formData.stream, formData.destination);
});

flickrImageDownloader.on('allDownloadsFinished', function () {
	$modal.removeClass('open');
});
