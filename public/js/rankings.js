/* Written by Sean Mayton
Interacts with the WarcraftLogs API to fetch and
analyze rankings of user characters.                */

// Receives array of JSON objects and iterates through the array to determine an average percentile ranking

function parseData(userRankings) {
  let pctSum = 0;
  let parsedLength = 0;   // Counter for number of valid ranking files

  for (let i = 0; i < userRankings.length; i += 1) {
    const userRanking = userRankings[i];
    if (userRanking.difficulty > 2) {     // Ensures the lowest difficulty encounters are not included
      const date = new Date((userRanking.startTime));
      pctSum += userRanking.percentile;
      parsedLength += 1;
  
      console.log(`${date} | ${parsedLength}`);
      console.log(`Ranking: ${userRanking.rank} out of ${userRanking.outOf}. Percentile ranking: ${userRanking.percentile}.`);  
    }

  }
  console.log(pctSum);
  // Constructs return string to be displayed on the web page
  const returnString = (`${jQuery('#userCharacter').val()} Is In the Top ${(100 - ((pctSum / parsedLength).toFixed()))}% of Players for ${jQuery('#logMetric').val().toUpperCase()}.`);
  document.getElementById('avgRanking').innerHTML = returnString;     // Displays the return string on the web page
}

// Assembles and executes the API request using data input by the user

function buildRankings() {
  const tarServer = jQuery('#userServer').val();
  const tarRegion = jQuery('#userRegion').val();
  const tarCharacter = jQuery('#userCharacter').val();
  const tarMetric = jQuery('#logMetric').val();
  const logsKey = jQuery('#userKey').val();

  const apiURL = `https://www.warcraftlogs.com:443/v1/rankings/character/${tarCharacter}/${tarServer}/${tarRegion}?metric=${tarMetric}&timeframe=historical&api_key=${logsKey}`;
  console.log(apiURL);

  // Executes API request, calls function parseData()
  jQuery.ajax({
    url: apiURL, method: 'GET', success: parseData,
  });

}

// Toggles keyField to show the API key
// NOTE: Currently defunct as said field is hidden by .css

function toggleKeyField() {
  const keyField = document.getElementById('userKey');

  if (keyField.style.display === 'none') {
    keyField.style.display = 'block';
  } else {
    keyField.style.display = 'none';
  }
}

