// import util from 'util'
import AWS from 'aws-sdk'
import { AttributeValue as attr } from 'dynamodb-data-types'

const dynamodb = new AWS.DynamoDB({region: 'ap-northeast-1'})
const TABLE_NAME = 'no_small_p_matters'

/**
 * return promised dynamodb data serialize
 * @param  {Array<Matter>} data [description]
 * @return {Promise}   [description]
 */
export const update = data => {

  const promisedRequests = data.map(matter => {
    const params = {
      TableName : TABLE_NAME,
      Item      : attr.wrap(matter),
    }
    // return util.promisify(dynamodb.putItem)(params)
    return new Promise((resolve, reject) => {
      dynamodb.putItem(params, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  })

  return Promise.all(promisedRequests)
}

export const load = filter => data => {

  var params = {
    TableName                : TABLE_NAME,
    ProjectionExpression     : '#yr, title, info.genres, info.actors[0]',
    KeyConditionExpression   : '#yr = :yyyy and title between :letter1 and :letter2',
    ExpressionAttributeNames : {
      '#yr': 'year'
    },
    ExpressionAttributeValues : {
      ':yyyy'    :1992,
      ':letter1' : 'A',
      ':letter2' : 'L',
    }
  }

  return new Promise((resolve, reject) => {
    dynamodb.query(params, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
