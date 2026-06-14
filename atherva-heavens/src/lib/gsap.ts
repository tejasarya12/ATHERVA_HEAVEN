import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { CustomEase } from 'gsap/CustomEase';
import { Draggable } from 'gsap/Draggable';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrollTrigger, Flip, Observer, CustomEase, Draggable, ScrollToPlugin, ScrambleTextPlugin);

export default gsap;
export { ScrollTrigger, Flip, Observer, CustomEase, Draggable, ScrollToPlugin, ScrambleTextPlugin };
