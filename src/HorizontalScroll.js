import React, { useEffect } from 'react'
import "./Horizontal.css"


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


import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css'; // Import the Locomotive Scroll CSS


// gsap.registerPlugin(useGSAP, Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, MotionPathPlugin, EaselPlugin, PixiPlugin, TextPlugin, RoughEase, ExpoScaleEase, SlowMo, CustomEase);
gsap.registerPlugin(ScrollTrigger);


const HorizontalScroll = () => {

    useEffect(() => {

        const pageContainer = document.querySelector("#container");
        const locoScroll = new LocomotiveScroll({
            el: pageContainer,
            smooth: true,
            multiplier: 1.5, // Adjust the speed as necessary
        });

        locoScroll.on('scroll', ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(pageContainer, {
            scrollTop(value) {
                return arguments.length
                    ? locoScroll.scrollTo(value, 0, 0)
                    : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: pageContainer.style.transform ? 'transform' : 'fixed',
        });
        ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
        ScrollTrigger.refresh();


        let horizontalSection = document.querySelector('.horizontal');
        console.log(horizontalSection.scrollWidth);
        gsap.to('.horizontal', {
            x: () => horizontalSection.scrollWidth * -1,
            xPercent: 100,
            scrollTrigger: {
                trigger: '.horizontal',
                start: 'center center',
                end: '+=2000px',
                pin: '#horizontal-scoll',
                scrub: true,
                invalidateOnRefresh: true,
                scroller: '#container', // Use the Locomotive Scroll container
            }
        });

        const cursor = document.querySelector('.cursor')
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.pageX + 'px'
            cursor.style.top = e.pageY + 'px'
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            locoScroll.destroy();
        };

    }, [])

    return (
        <>

            <div id="container">
                <section class="intro">
                    <h1>TEST</h1>
                    <div class="cursor"></div>
                </section>
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
                        <a href="https://www.humming.design" target="_blank">TEST2</a>
                    </div>
                </footer>
            </div>

        </>
    )
}

export default HorizontalScroll