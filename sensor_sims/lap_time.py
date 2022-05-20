from faker import Faker
from ably import AblyRest
import time
import datetime
import asyncio

API_KEY = 'MTjZGg.F4pyTg:Cb6yxwC6P3ZxW_kgkxF4DShAh5KbkRMG3WA2QpL2DtY'

faker = Faker()

async def ch_publish(channel):
    
    runtime = datetime.datetime.now() + datetime.timedelta(minutes=5)
    count = 0
    
    while True:
        count+=1 
        lap = (f'Lap {count} Time: {faker.pydecimal(left_digits=2, right_digits=2, positive= True, min_value=44, max_value=51)}')
        await channel.publish('event', lap)
        time.sleep(30.0)
        if datetime.datetime.now() >= runtime:
            break

async def main():
    client = AblyRest(API_KEY)

    print('Instantiating channel...')
    channel = client.channels.get('Lap-Time')

    await ch_publish(channel)
    #await ch_history(channel)
    #await ch_presence(channel)


asyncio.run(main())


