import moment from 'moment'

export function getRelativeTime(timestamp, hours = 24) {
    const now = moment();

    const reference = moment(timestamp);

    if (now.diff(reference, 'hour') < 1) {

        return now.diff(reference, 'minute') + ' minutes ago'

    } else if (now.diff(reference, 'hour') < hours) {

        return now.diff(reference, 'hour') + ' hours ago'

    } else {

        return reference.format('DD MMM YYYY')
    }

}