import * as admin from 'firebase-admin';
import moment from 'moment';
import { TimestampObject } from '../index.d';

const firestoreTimestamptToSqlDateTime = (obj: TimestampObject) =>
  moment(new admin.firestore.Timestamp(obj.seconds, obj.nanoseconds).toDate())
    .format('YYYY-MM-DD hh:mm:ss');

  export default firestoreTimestamptToSqlDateTime;
