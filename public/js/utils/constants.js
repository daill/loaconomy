export default {
        defaultFormValues: {
            server: "Azur Sky",
            kind: 0
        }
    }

export const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
];

export const host = window.location.protocol + "//" + window.location.hostname + (location.port ? ':'+location.port: '');
