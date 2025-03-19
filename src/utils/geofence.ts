// this code is basically rules set for validating checkin / checkout. if the users lat & long is between the specified rules
// then they can checkin/checkout. if not they cant.

const officeBounds = {
    topLeft: { lat: 27.7079, lng: 85.3199 },
    bottomLeft: { lat: 27.7058, lng: 85.3199 },
    topRight: { lat: 27.7079, lng: 85.3227 },
    bottomRight: { lat: 27.7058, lng: 85.3227 }
};

export const isInsideOffice = (latitude: number, longitude: number): boolean => {
    return (
        latitude >= officeBounds.bottomLeft.lat && latitude <= officeBounds.topLeft.lat &&
        longitude >= officeBounds.bottomLeft.lng && longitude <= officeBounds.bottomRight.lng
    );
};