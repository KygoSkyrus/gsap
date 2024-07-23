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


gsap.registerPlugin(useGSAP, Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, MotionPathPlugin, EaselPlugin, PixiPlugin, TextPlugin, RoughEase, ExpoScaleEase, SlowMo, CustomEase);


const HorizontalScroll = () => {

    useEffect(() => {
        let sections = gsap.utils.toArray(".panel");

        // gsap.to(sections, {
        //     xPercent: -100 * (sections.length - 1),
        //     ease: "none",
        //     scrollTrigger: {
        //         trigger: ".container",
        //         pin: true,
        //         scrub: 1,
        //         snap: 1 / (sections.length - 1),
        //         end: () => "+=" + document.querySelector(".container").offsetWidth
        //     }
        // });

    }, [])

    return (
        <>
            <div class="firstContainer">
                <h1>Testing horizontal scrolling w/ three sections</h1>
                <h2>First Container</h2>
            </div>
            <div class="container">
                <div class="description panel blue">
                    <div>
                        SCROLL DOWN
                        <div class="scroll-down">
                            <div class="arrow"></div>
                        </div>
                    </div>
                </div>

                <section class="panel red">
                    ONE
                </section>
                <section class="panel orange">
                    TWO
                </section>
                <section class="panel purple">
                    THREE
                </section>
            </div>
            <div class="lastContainer">
                Last Container
            </div>
        </>
    )
}

export default HorizontalScroll