// this code is basically rules set for validating checkin / checkout. if the users lat & long is between the specified rules
// then they can checkin/checkout. if not they cant.

// const officeBounds = [
//     { lat: 27.708000, lng: 85.316859 },
//     { lat: 27.707815, lng: 85.325077 },
//     { lat: 27.705450, lng: 85.325169 },
//     { lat: 27.706172, lng: 85.316543 }
// ];

const officeBounds = [
    { lat: 27.7488, lng: 85.3479 },
    { lat: 27.7483, lng: 85.3462 },
    { lat: 27.7474, lng: 85.3467 },
    { lat: 27.7476, lng: 85.3484 }
];

export const isInsideOffice = (latitude: number, longitude: number): boolean => {
    let x = longitude, y = latitude;

    let inside = false;
    for (let i = 0, j = officeBounds.length - 1; i < officeBounds.length; j = i++) {
        let xi = officeBounds[i].lng, yi = officeBounds[i].lat;
        let xj = officeBounds[j].lng, yj = officeBounds[j].lat;

        let intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};