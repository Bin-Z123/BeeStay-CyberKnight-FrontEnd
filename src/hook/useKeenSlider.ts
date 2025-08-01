import { Ref } from "vue";
import { useKeenSlider } from "keen-slider/vue.es"
import { set } from "lodash";
const useThumbnailPluginKeenSlider = (main: Ref<any>) => {
    return (slider: any) => {
        // Thumnail
        const removeActive = () => {
            slider.slides.forEach((slide: HTMLElement) => {
                slide.classList.remove("active")
            })
        }
        const addActive = (index: number) => {
            slider.slides[index].classList.add("active")
        }
        const addClickEvent = () => {
            slider.slides.forEach((slide: HTMLElement, index: number) => {
                slide.addEventListener("click", () => {
                    main.value.moveToIdx(index)
                })
            })
        }

        // Chạy Slider
        slider.on("created", () => {
            addActive(slider.track.details.rel)
            addClickEvent()
            main.value.on("animationStarted", () => {
                removeActive()
                const next = main.value.animator.targetIdx || 0
                addActive(main.value.track.absToRel(next))
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
            })


        })
    }
}

export { useThumbnailPluginKeenSlider }


// import { Ref } from "vue"

// const useThumbnailPluginKeenSlider = (main: Ref<any>) => {
//     return (slider: any) => {
//         let timeout: any
//         let mouseOver = false
//         let isSyncing = false // ← tránh sync chồng

//         const removeActive = () => {
//             slider.slides.forEach((slide: HTMLElement) => {
//                 slide.classList.remove("active")
//             })
//         }

//         const addActive = (index: number) => {
//             removeActive() // ← đảm bảo clear trước
//             if (slider.slides[index]) {
//                 slider.slides[index].classList.add("active")
//             }
//         }

//         const addClickEvent = () => {
//             slider.slides.forEach((slide: HTMLElement, index: number) => {
//                 slide.addEventListener("click", () => {
//                     if (isSyncing) return // ← tránh spam
//                     isSyncing = true
//                     main.value?.moveToIdx(index)
//                     setTimeout(() => isSyncing = false, 300)
//                 })
//             })
//         }

//         const clearNextTimeout = () => {
//             clearTimeout(timeout)
//         }

//         const nextTimeout = () => {
//             clearTimeout(timeout)
//             if (mouseOver) return
//             timeout = setTimeout(() => {
//                 if (main.value) {
//                     main.value.next()
//                 }
//             }, 3000)
//         }

//         slider.on("created", () => {
//             addActive(slider.track.details.rel)
//             addClickEvent()

//             // Đồng bộ khi container slider chạy
//             main.value?.on("animationStarted", () => {
//                 const next = main.value.animator?.targetIdx || 0
//                 const rel = main.value.track.absToRel(next)
//                 addActive(rel)

//                 // Đồng bộ thumbnail cũng moveTo nếu chưa đúng
//                 if (slider.track.details.rel !== rel) {
//                     slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
//                 }
//             })

//             slider.container.addEventListener("mouseover", () => {
//                 mouseOver = true
//                 clearNextTimeout()
//             })

//             slider.container.addEventListener("mouseout", () => {
//                 mouseOver = false
//                 nextTimeout()
//             })

//             nextTimeout()
//         })

//         slider.on("dragStarted", clearNextTimeout)
//         slider.on("animationEnded", () => {
//             const rel = slider.track.details.rel
//             addActive(rel)
//             nextTimeout()
//         })

//         slider.on("updated", () => {
//             nextTimeout()
//         })
//     }
// }

// export { useThumbnailPluginKeenSlider }
