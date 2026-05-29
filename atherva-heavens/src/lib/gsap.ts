import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { CustomEase } from 'gsap/CustomEase';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger, Flip, Observer, CustomEase, Draggable);

export default gsap;
export { ScrollTrigger, Flip, Observer, CustomEase, Draggable };
