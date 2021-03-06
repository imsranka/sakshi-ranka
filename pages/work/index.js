import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { projects } from "../../shared/data";
// import coverBG from "../assets/images/cover4.jpg";
import wStyles from "../../styles/Works.module.css";
import { dynamicCompare } from "../../shared/utils";

const Works = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [classArr, setClassArr] = useState([]);
  const router = useRouter();
  const [projId, setProjID] = useState(null);
  const [unmount, setUnmount] = useState(false);
  // const [initClassArr, setInitClassArr] = useState([]);
  let c1 = wStyles.work_slider;
  let c2 = wStyles.work_slider__active;
  let c3 = wStyles.work_slider__no_transition;
  let c4 = wStyles.work_slider__prev;
  let touchYstart, touchYend;

  // let classes = useMemo(() => {
  //   let c1 = wStyles.work_slider;
  //   let c2 = wStyles.work_slider__active;
  //   let c3 = wStyles.work_slider__no_transition;
  //   let c4 = wStyles.work_slider__prev;
  //   let x = [];

  //   projects.forEach((proj, i) => {
  //     if (activeSlide === i) {
  //       x[i] = [c1, c2].join(" ");
  //     } else if (activeSlide - 1 === i) {
  //       x[i] = [c1, c4].join(" ");
  //     } else {
  //       x[i] = [c1, c3].join(" ");
  //     }
  //   });
  //   return x;
  // }, [projects]);

  const nextSlide = (curr) => {
    let len = projects.length;
    let x = [];
    curr === len - 1 ? setActiveSlide(0) : setActiveSlide((prev) => ++prev);

    if (curr === 0) {
      x[0] = [c1, c4].join(" ");
      projects.forEach((p, i) => {
        if (i !== 0) {
          x[i] = [c1, c3].join(" ");
        }
      });
    } else {
      projects.forEach((p, i) => {
        if (i === curr) {
          x[i] = [c1, c4].join(" ");
        } else {
          x[i] = [c1].join(" ");
        }
      });
    }
    setClassArr(x);
  };

  const backSlide = (curr) => {
    let len = projects.length;
    let x = [];
    curr === 0 ? setActiveSlide(len - 1) : setActiveSlide((prev) => prev - 1);

    if (curr === 0) {
      x[0] = [c1].join(" ");
      x[len - 1] = [c1, c4, c3].join(" ");

      projects.forEach((p, i) => {
        if (i !== 0 && i !== len - 1) {
          x[i] = [c1];
        }
      });
    } else {
      projects.forEach((p, i) => {
        if (i === curr - 1) {
          x[i] = [c1, c4, c3].join(" ");
        } else x[i] = [c1].join(" ");
      });
    }
    setClassArr(x);
    router.push("/work", undefined, {
      shallow: true,
    });
  };

  const classChangeOnTrans = () => {
    let x = [];

    projects.forEach((proj, i) => {
      if (activeSlide === i) {
        x[i] = [c1, c2].join(" ");
      } else {
        x[i] = [c1, c3].join(" ");
      }
    });
    setClassArr(x);
    setTimeout(function () {
      let x = [];

      projects.forEach((proj, i) => {
        if (activeSlide === i) {
          x[i] = [c1, c2].join(" ");
        } else {
          x[i] = [c1].join(" ");
        }
      });
      setClassArr(x);
    }, 100);
  };

  useLayoutEffect(() => {
    let x = [];

    projects.forEach((proj, i) => {
      if (activeSlide === i) {
        x[i] = [c1, c2].join(" ");
      } else if (activeSlide - 1 === i) {
        x[i] = [c1, c3].join(" ");
      } else {
        x[i] = [c1, c3].join(" ");
      }
    });
    setClassArr(x);
  }, []);

  const handleTS = (e) => {
    e.preventDefault();
    touchYstart = e.changedTouches[0].clientY;
  };

  const handleTE = (e) => {
    touchYend = e.changedTouches[0].clientY;
    if (!touchYstart && !touchYend) {
      return;
    }
    if (touchYend < touchYstart) {
      nextSlide(activeSlide);
    } else if (touchYend > touchYstart) {
      backSlide(activeSlide);
    }
  };

  return (
    <>
      <Head>
        <title>SR | Works</title>
      </Head>
      <div
        className={`${wStyles.work_wrapper}`}
        onTouchStart={handleTS}
        onTouchEnd={handleTE}
      >
        <button
          className={wStyles.button_up}
          onClick={() => backSlide(activeSlide)}
        >
          &lt;
        </button>
        <button
          className={wStyles.button_down}
          onClick={() => nextSlide(activeSlide)}
        >
          &gt;
        </button>
        <ul className={wStyles.work_container}>
          {projects.sort(dynamicCompare("id")).map((proj, i) => (
            <li
              className={classArr[i]}
              key={proj.name}
              onTransitionEnd={classChangeOnTrans}
              // onLoad={(i) => console.log("hi", i)}
            >
              <article
                className={wStyles.work_slider__content}
                // style={{ backgroundColor: "black" }}
                // style={{ backgroundImage: "url(" + `${coverBG.src}` + ")" }}
              >
                <span className={wStyles.slide_no}>{proj.id}</span>
                <div className={wStyles.work_slide_project_main_wrapper}>
                  <div className={wStyles.work_slide_project_name}>
                    {proj.name}
                  </div>
                  <div />
                  <div
                    className={wStyles.see_more_btn}
                    onClick={(e) => {
                      e.preventDefault();
                      setProjID(proj.name.toLowerCase().split(" ").join("-"));
                      router.push(
                        `/work/${proj.name.toLowerCase().split(" ").join("-")}`,
                        undefined,
                        {
                          shallow: true,
                        }
                      );
                    }}
                  >
                    {"See More >>"}
                  </div>
                </div>

                <div className={wStyles.work_slide_content}>
                  <div className={wStyles.work_slide_role}>
                    <strong className={wStyles.work_slide_role_title}>
                      Role
                    </strong>
                    <br />
                    {proj.role}
                  </div>
                  <br />
                  <div className={wStyles.work_slide_company}>
                    <strong className={wStyles.work_slide_company_title}>
                      Company
                    </strong>
                    <br />
                    {proj.org}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Works;
