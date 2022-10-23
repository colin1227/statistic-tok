// Run this on https://www.tiktok.com/@your_username

let topViewing = true;
let tiktoksOnScreen = 0;
let tiktoks = [];
let topOfPage = 0;
let bottomOfPage = document.body.scrollHeight;

// where to find the lowest class containing all of the following necessary components on the page
const tiktoksSectionClasses = 'tiktok-xuns3v-DivShareLayoutMain ee7zj8d4';
const tabsParentComponentClasses = 'tiktok-1pf7b6q-DivVideoFeedTab-StyledDivVideoFeedTabV2 e9uh1830';

// Videos tab
const videosTabClasses = 'e1jjp0pq1';
const videosTabOffClasses = 'tiktok-1vuksjn-PPost';
const videosTabOnClasses = 'tiktok-wugwia-PPost';

// Liked tab
const likedTabClasses = 'e1jjp0pq2';
const likedTabOffClasses = 'tiktok-1dcmmcm-PLike';
const likedTabOnClasses = 'tiktok-4tz3e6-PLike';

// all of the tiktoks for the clicked section.
const tiktokVideosParentContainerClasses = 'tiktok-yvmafn-DivVideoFeedV2 e5w7ny40';
const tiktokVideoClasses = 'tiktok-x6y88p-DivItemContainerV2 e19c29qe7';

// This is how I get each individual tiktok's url.
const aTagParentClasses = 'tiktok-yz6ijl-DivWrapper e1cg0wnj1';


const openLikes = () => {
  let tiktokSection = document.getElementsByClassName(tiktoksSectionClasses)[0];
  let tabsComponent = tiktokSection.getElementsByClassName(tabsParentComponentClasses)[0];

  // starting state
  // videos tab clicked, liked tab unclicked
  let videoTab = tabsComponent.getElementsByClassName(videosTabClasses)[0];
  let likedTab = tabsComponent.getElementsByClassName(likedTabClasses)[0];

  // change classes to edit css as if actually clicking like button.
  
  likedTab.classList.replace(likedTabOffClasses, likedTabOnClasses);
  videoTab.classList.replace(videosTabOnClasses, videosTabOffClasses);

  likedTab.click();
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
  let videoFeed = document.getElementsByClassName(tiktokVideosParentContainerClasses)[0];
  
  
  tiktoksOnScreen = videoFeed.children.length;
  bottomOfPage = document.body.scrollHeight;
  let extending = true;

  // While tiktoks are on the page get add them to the list of urls.
  while(tiktoksOnScreen && extending) {
    // Find tiktok url
    let singleTikTok = videoFeed.getElementsByClassName(tiktokVideoClasses)[0];
    let aTagParent = singleTikTok.getElementsByClassName(aTagParentClasses)[0];
    let aTag = aTagParent.getElementsByTagName('a')[0];
    
    // Add url
    tiktoks = [...tiktoks, aTag.href];

    // Remove tiktok from page to reduce rendering time.
    videoFeed.removeChild(singleTikTok);
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

  I = P * R * T

  P = 1500(the interval)
  R = 0.04(how much time should increment each iteration)
  T = 665(20,000{the number of liked tiktoks the server saves} / 30{the number of tiktoks served on request})

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



