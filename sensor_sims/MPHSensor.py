from faker import Faker
from ably import AblyRest
import time
import datetime
import asyncio

API_KEY = #YOUR-API-KEY-HERE#

faker = Faker()

async def ch_publish(channel):

  endTime = datetime.datetime.now() + datetime.timedelta(minutes=5)

  while True:
    
    if datetime.datetime.now() <= endTime:
      speed = (f'MPH: {faker.pydecimal(left_digits=3, right_digits=0, positive= True, min_value=191, max_value=203)}')
      await channel.publish('event', speed)
      time.sleep(.200)

async def main():
    client = AblyRest(API_KEY)

    print('Instantiating channel...')
    channel = client.channels.get('Car-Speed')

    await ch_publish(channel)
    #await ch_history(channel)
    #await ch_presence(channel)


asyncio.run(main())
