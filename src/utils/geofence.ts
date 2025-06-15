// this code is basically rules set for validating checkin / checkout. if the users lat & long is between the specified rules
// then they can checkin/checkout. if not they cant.

// const officeBounds = [
//     { lat: 27.708, lng: 85.316859 },
//     { lat: 27.707815, lng: 85.325077 },
//     { lat: 27.70545, lng: 85.325169 },
//     { lat: 27.706172, lng: 85.316543 },
// ];

const officeBounds = [
    { lat: 27.750878, lng: 85.348026 },
    { lat: 27.750939, lng: 85.346844 },
    { lat: 27.749597, lng: 85.346645 },
    { lat: 27.749462, lng: 85.347999 },
];

export const isInsideOffice = (latitude: number, longitude: number): boolean => {
    let x = longitude,
        y = latitude;

    let inside = false;
    for (let i = 0, j = officeBounds.length - 1; i < officeBounds.length; j = i++) {
        let xi = officeBounds[i].lng,
            yi = officeBounds[i].lat;
        let xj = officeBounds[j].lng,
            yj = officeBounds[j].lat;

        let intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }

    return inside;
};
