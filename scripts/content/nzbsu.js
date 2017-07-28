Initialize('nzbsu', null, function() {
    console.log('NZB.su initialised...');

    if (! $('[id^=browsetable]').length) return;

    var apiKey;

    GetSetting('nzbsu_api_key', function(value) {
        apiKey = value;
    });

    var sabImage = '<img style="vertical-align:baseline" src="' + chrome.extension.getURL('/images/sab2_16.png') + '">',
        baseUrl = 'https://nzb.su/api?t=get&id=';

    $('[id^=browsetable] > div.data-row').each(function(index, item) {

        var nzbId = item.id.replace('guid', ''),
            title = $(item).find('[data-original-title="View details"]');

        title.prepend('<div class="icon"><a class="addSABnzbd" href="' + baseUrl + nzbId + '">' + sabImage + '</a></div>');
    });

    $('.addSABnzbd').on('click', function(event) {

        event.preventDefault();

        if (typeof apiKey == 'undefined') {
            console.log('No api key is set.');
        }

        addToSABnzbd(
            this,
            $(this).attr('href') + '&apikey=' + apiKey,
            'addurl',
            null, 
            null
        );
    })
});
