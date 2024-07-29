import React, { useEffect } from 'react'
import "./Horizontal.css"
import dg from './dgsvg.svg'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";


import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";


// gsap.registerPlugin(useGSAP, Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, MotionPathPlugin, EaselPlugin, PixiPlugin, TextPlugin, RoughEase, ExpoScaleEase, SlowMo, CustomEase);
gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {

    useEffect(() => {


        // zoomin
        ScrollTrigger.defaults({
            // Defaults are used by all ScrollTriggers
            toggleActions: "restart pause resume pause", // Scoll effect Forward, Leave, Back, Back Leave
            markers: true // Easaly remove markers for production 
        });

        const timelineHeader = gsap.timeline({
            scrollTrigger: {
                id: "ZOOM", // Custom label to the marker
                trigger: ".big", // What element triggers the scroll
                scrub: 0.5, // Add a small delay of scrolling and animation. `true` is direct
                start: "top top", // Start at top of Trigger and at the top of the viewport
                end: "+=100% 50px", // The element is 500px height and end 50px from the top of the viewport
                pin: true, // Pin the element true or false
            }
        });

        timelineHeader
            .to(".name-h", {
                scale: 100
            }, "sameTime")
            .to(".big", {
                background: "rgb(74 222 128)"
            }, "sameTime")



        // horizontal scroll
        let horizontalSection = document.querySelector('.horizontal');
        let cards = gsap.utils.toArray(".card");

        gsap.to('.horizontal', {
            x: () => horizontalSection.scrollWidth * -1,
            xPercent: 100,
            scrollTrigger: {
                trigger: '.horizontal',
                start: 'center center',
                end: '+=2000px',
                pin: '#horizontal-scoll',
                snap: {
                    snapTo: 1 / (cards.length - 1), // total no. of cards
                    duration: 1,
                    delay: 0,
                    ease: "power4"  // "bounce"
                },
                scrub: true,
                invalidateOnRefresh: true
            },
            ease: "none"
        });

        // cursor
        const cursor = document.querySelector('.cursor')
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.pageX + 'px'
            cursor.style.top = e.pageY + 'px'
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [])

    return (
        <>
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <div class="cursor"></div>
                    {/* <section class="intro">
                <h1>Horizontal Scrolling Cards with GSAP</h1>
                <div class="cursor"></div>
            </section> */}

                    <div className='bg bg-rose-400 h-screen self-center flex items-center justify-center overflow-hidden big'>
                        <div className=' name-h '>
                            <h2 className='max-sm:text-[11rem] text-[16rem] max-sm:leading-[11rem] leading-[16rem]' >
                                DG
                            </h2>

                            <section className='text-center font-thin mt-2 max-sm:tracking-[8px] tracking-[17px] relative right-[14px] max-sm:right-[-7px] text-[14px]'>WEB DEVELOPER</section>
                        </div>
                    </div>

                    <div className='bg bg-green-400 h-screen self-center relative'>
                        <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                            <div class="outer">
                                <div class="inner">This is Section 2</div>
                            </div>
                        </div>
                    </div>

                    <section id="horizontal-scoll">
                        <div class="horizontal-scoll-wrapper">
                            <div class="horizontal">
                                <div>
                                    <div class="card">
                                        <h2>Card 1</h2>
                                    </div>
                                </div>
                                <div>
                                    <div class="card">
                                        <h2>Card 2</h2>
                                    </div>
                                </div>
                                <div>
                                    <div class="card">
                                        <h2>Card 3</h2>
                                    </div>
                                </div>
                                <div>
                                    <div class="card">
                                        <h2>Card 4</h2>
                                    </div>
                                </div>
                                <div>
                                    <div class="card">
                                        <h2>Card 5</h2>
                                    </div>
                                </div>
                                <div>
                                    <div class="card">
                                        <h2>Card 6</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer>
                        <div>
                            <h2>Credits</h2>
                            <a href="https://www.humming.design" target="_blank">Humming</a>
                            <a href="https://greensock.com" target="_blank">GSAP</a>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default HorizontalScroll