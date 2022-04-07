// @ts-check

const VIDEO_START = 1;
const VIDEO_END = 30;
const NUM_VIDEOS = Math.abs(VIDEO_END - VIDEO_START) + 1;

const PATH = "videos";

/** @type {{ele: HTMLVideoElement, loaded: boolean}[]} */
const videos = new Array(NUM_VIDEOS);

let loadedVids = 0;

const container = document.querySelector(".container");

function load()
{
    // if(videos) { console.log("already loaded"); return; }

    for(let i = VIDEO_START; i <= VIDEO_END; i++)
    {
        const videoName = `${PATH}/${i.toString()}.mp4`;

        const ele = document.createElement("video");
        ele.id = "num-" + i.toString();
        ele.controls = false;

        ele.preload = "auto";

        ele.src = videoName;

        videos[i - VIDEO_START] = { ele, loaded: false };
    }

    videos.map((v, i) =>
    {
        v.ele.addEventListener("load", () => { videos[i].loaded = true; loadedVids++; console.log(`loaded ${i}`); });

        v.ele.addEventListener("error", ev => console.error(ev.message));
    });
}

let current = 0;
let finished = true;

function next()
{
    if(!finished) { console.log("last video not finished"); return; }
    if(current >= NUM_VIDEOS) { console.log("finshed"); return; }

    display();
    
    videos[current].ele.play();
    
    current++;

}

function display()
{
    if(container.firstChild) { container.firstChild.remove(); }
    container.append(videos[current].ele);
}

load();
display();

window.addEventListener("click", ev => { ev.preventDefault(); next(); });

window.addEventListener("keypress", ev => { ev.preventDefault(); next(); });

window.addEventListener("contextmenu", ev => { ev.preventDefault(); current -= 2; next(); })