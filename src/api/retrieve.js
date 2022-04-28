import { Routes } from "./routes";

// this method calls API to get Testimonials
export const getTestimonials = async(page, track, exercise, order) => {
    let params = "?";
    if (page != null)
        params +=
        "page=" +
        page +
        (track === null || track === "" ? "" : "&track=" + track.slug) +
        (exercise === null || exercise === "" ? "" : "&exercise=" + exercise) +
        "&order=" +
        (order === 0 ? "newest_first" : "oldest_first");
    console.log(params);
    return await fetch(Routes.testimonials + params).then((res) => res.json());
};

// this method calls API to get Tracks
export const getTracks = async() => {
    return await fetch(Routes.tracks).then((res) => res.json());
};