// Run this on https://www.tiktok.com/@your_username

let topViewing = true;
let tiktoksOnScreen = 0;
let tiktoks = [];
let topOfPage = 0;
let bottomOfPage = document.body.scrollHeight;

const tiktokSectionClasses = 'tiktok-xuns3v-DivShareLayoutMain e13s99ws4';
const tabsComponentClasses = 'tiktok-1k5e4nr-DivVideoFeedTab-StyledDivVideoFeedTabV2 eznjahc0';
const videoTabClasses = 'tiktok-tr4p7q-PPost e1mvjtt51';
const likeTabClasses = 'tiktok-1qocf9t-PLike e1mvjtt52';
const videoFeedClasses = 'tiktok-yvmafn-DivVideoFeedV2 esz6wny0';
const memeClasses = 'tiktok-x6y88p-DivItemContainerV2 e1z53d07';
const aTagParentClass = 'tiktok-yz6ijl-DivWrapper e1u9v4ua1';

const openLikes = () => {
  let tiktokSection = document.getElementsByClassName(tiktokSectionClasses)[0];

  let tabsComponent = tiktokSection.getElementsByClassName(tabsComponentClasses)[0];

  let videoTab = tabsComponent.getElementsByClassName(videoTabClasses)[0];
  let likeTab = tabsComponent.getElementsByClassName(likeTabClasses)[0];

  // change classes to edit css as if actually clicking like button.
  videoTab.classList.remove('active');
  likeTab.classList.add('active');

  likeTab.click();
}

// Scroll down and up.
const scrollDownScrollUp = () => {
  bottomOfPage = document.body.scrollHeight;
  window.scroll(0, bottomOfPage);
  window.scroll(0, 0);
}

// Scroll up then down.
const scrollUpScrollDown = () => {
  bottomOfPage = document.body.scrollHeight;
  window.scroll(0, 0);
  window.scroll(0, bottomOfPage);
}

// Adds likes to list of all likes
const getLikeList = () => {

  // all data 
  let videoFeed = document.getElementsByClassName(videoFeedClasses)[0];
  
  
  tiktoksOnScreen = videoFeed.children.length;
  bottomOfPage = document.body.scrollHeight;
  let extending = true;

  // While tiktoks are on the page get add them to the list of urls.
  while(tiktoksOnScreen && extending) {
    // Find tiktok url
    let meme = videoFeed.getElementsByClassName(memeClasses)[0];
    let aTagParent = meme.getElementsByClassName(aTagParentClass)[0];
    let aTag = aTagParent.getElementsByTagName('a')[0];
    
    // Add url
    tiktoks = [...tiktoks, aTag.href];

    // Remove tiktok from page to reduce rendering time.
    videoFeed.removeChild(meme);
    tiktoksOnScreen -= 1;
    // no more tiktoks in videoFeed
    if (bottomOfPage < 891) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      tiktoksOnScreen = videoFeed.children.length;
    }
  }
};

openLikes();

/*
  small TODO: Intervals could/should scale with number of request of tiktoks
  becuse they take longer to find after awhile.
*/
const interval = 1500;
let iterate;
const start = () => {
  iterate = setInterval(() => {
    getLikeList();
    if(topViewing) {
      scrollUpScrollDown();
      topViewing = false;
    } else {
      scrollDownScrollUp();
      topViewing = true;
    }
  }, interval);
}

const stop = () => {
  clearInterval(iterate);
}



