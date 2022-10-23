const { myTikToks } = require("./myTikToksOct23");

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
function sortCreators(arr) {
  return arr.sort((a, b) =>
    arr.filter(v => v === a).length
    - arr.filter(v => v === b).length);
}

const orgainize = () => {
  let individualAccounts = [];
  let videoIdentifiers = [];
  let accounts = [];

  for (let r = 0; r < myTikToks.length; r++) {
    let creator = myTikToks[r].split('/').slice(0, -2).join('/');

    let idString = myTikToks[r].split('/');
    let videoId = idString[idString.length - 1];

    if (!individualAccounts.includes(creator)) {
      individualAccounts = [...individualAccounts, creator]
    }
    videoIdentifiers = [...videoIdentifiers, videoId];
    accounts = [...accounts, creator];
  }
  return { accounts, individualAccounts, videoIdentifiers };
};


const initialData = orgainize();

const sortedUnfilteredData = sortCreators(initialData.accounts);

const orderedData = sortedUnfilteredData.filter(onlyUnique);

const mostViewedCreators = {
  '1': '',
  '2': '',
  '3': '',
  '4': '',
  '5': '',
  '6': '',
  '7': '',
  '8': '',
  '9': '',
  '10': '',
};

const topNCreators = (n = 10) => {
  for (let iterator = 0; iterator < orderedData.length; iterator++) {
    if (orderedData.length - n <= iterator) {
      mostViewedCreators[(orderedData.length - iterator + 1).toString(10)] = orderedData[iterator];
    }
  }

  const orderKeys = Object.keys(mostViewedCreators);

  console.log(`${n} Most Viewed Creators:`);

  for (let i = 0; i < n; i++) {
    console.log(`${orderKeys[i]}: ${mostViewedCreators[(i + 2).toString(10)]}  (${sortedUnfilteredData.filter((url) => url.includes(mostViewedCreators[(i + 2).toString(10)])).length} tiktoks)`);
  }
}

topNCreators(15)
