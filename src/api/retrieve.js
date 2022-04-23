import { Routes } from "./routes";

export const getTestimonials = async(page, track, exercise, order) => {
    let params = "?";
    if (page != null)
        params +=
        "page=" +
        page +
        (track === null || track === "" ? "" : "&track=" + track) +
        (exercise === null || exercise === "" ? "" : "&exercise=" + exercise) +
        "&order=" +
        (order === 0 ? "newest_first" : "oldest_first");
    console.log(params);
    return await fetch(Routes.testimonials + params).then((res) => res.json());
};