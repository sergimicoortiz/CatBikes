from faker import Faker
from random import randint
import django
import os
import numpy as np

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "src.settings")
django.setup()
from src.app.stations.serializers import (
    BikeSerializer,
    StationSerializer,
    SlotSerializer,
)

fake = Faker()

cats_img = [
    "https://cdn.pixabay.com/photo/2017/06/12/19/02/cat-2396473__480.jpg",
    "https://cdn.pixabay.com/photo/2015/06/03/13/13/cats-796437__480.jpg",
    "https://cdn.pixabay.com/photo/2012/11/26/13/58/cat-67345__480.jpg",
    "https://cdn.pixabay.com/photo/2014/09/18/20/17/cat-451377__480.jpg",
    "https://cdn.pixabay.com/photo/2015/01/31/12/36/cat-618470__480.jpg",
    "https://cdn.pixabay.com/photo/2014/07/24/18/40/cat-401124__480.jpg",
    "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__480.jpg",
    "https://cdn.pixabay.com/photo/2015/02/14/10/16/cat-636172__480.jpg",
    "https://cdn.pixabay.com/photo/2013/10/28/14/30/cat-201855__480.jpg",
    "https://cdn.pixabay.com/photo/2015/04/16/15/21/cat-725793__480.jpg",
    "https://cdn.pixabay.com/photo/2016/01/20/13/05/cat-1151519__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/31/21/52/cat-2361787__480.jpg",
    "https://cdn.pixabay.com/photo/2014/10/01/10/46/cat-468232__480.jpg",
    "https://cdn.pixabay.com/photo/2014/04/29/13/19/cat-334383__480.jpg",
    "https://cdn.pixabay.com/photo/2014/01/17/14/53/cat-246933__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/31/21/46/cats-2361762__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/21/22/06/cat-2332444__480.jpg",
    "https://cdn.pixabay.com/photo/2014/03/30/23/35/cat-301720__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/21/22/07/cat-2332451__480.jpg",
    "https://cdn.pixabay.com/photo/2014/08/03/00/51/kitten-408798__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/11/07/27/cat-2303146__480.jpg",
    "https://cdn.pixabay.com/photo/2014/03/30/23/49/cat-301723__480.jpg",
    "https://cdn.pixabay.com/photo/2013/07/18/20/27/cat-165068__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/25/07/40/cat-2342562__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/30/22/27/british-shorthair-2358404__480.jpg",
    "https://cdn.pixabay.com/photo/2017/04/06/15/15/cat-2208535__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/18/10/57/cat-2323258__480.jpg",
    "https://cdn.pixabay.com/photo/2016/11/18/21/26/cat-1836936__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/19/22/09/cat-2157747__480.jpg",
    "https://cdn.pixabay.com/photo/2017/04/21/13/24/red-headed-cat-2248705__480.jpg",
    "https://cdn.pixabay.com/photo/2017/04/10/18/52/cat-2219427__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/22/20/54/rest-2335341__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/13/09/46/cat-2309126__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/13/20/53/cat-2310623__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/30/14/14/cat-2188612__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/30/14/57/hunter-2357204__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/12/06/00/cat-2306185__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/23/21/31/cat-2338666__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/03/05/25/cat-2280148__480.jpg",
    "https://cdn.pixabay.com/photo/2017/04/08/13/53/cat-2213342__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/22/00/13/cat-2163594__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/13/21/14/british-shorthair-2310671__480.jpg",
    "https://cdn.pixabay.com/photo/2017/02/27/09/09/cat-2102418__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/05/16/21/cat-2118990__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/26/15/25/cat-2346301__480.jpg",
    "https://cdn.pixabay.com/photo/2017/02/12/11/52/cat-house-physician-2059812__480.jpg",
    "https://cdn.pixabay.com/photo/2017/04/14/19/56/british-shorthair-2231188__480.jpg",
    "https://cdn.pixabay.com/photo/2017/04/27/08/26/animal-2264818__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/21/16/36/cat-2331692__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/12/19/09/cat-2137810__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/16/18/36/summer-2149911__480.jpg",
    "https://cdn.pixabay.com/photo/2017/04/06/19/16/cat-2209109__480.jpg",
    "https://cdn.pixabay.com/photo/2017/04/05/10/31/cat-baby-2204590__480.jpg",
    "https://cdn.pixabay.com/photo/2017/02/24/17/10/chartreux-2095661__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/13/07/18/cat-2308849__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/18/11/21/cat-2323326__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/06/09/16/cat-2120915__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/23/09/01/cat-2336605__480.jpg",
    "https://cdn.pixabay.com/photo/2016/11/21/12/52/animal-1845248__480.jpg",
    "https://cdn.pixabay.com/photo/2017/04/07/18/37/cat-2211609__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/10/14/46/cat-2301015__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/13/09/47/cat-2309127__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/22/07/40/cat-2333413__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/12/01/29/cats-2136245__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/29/10/30/kitten-2353403__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/15/09/59/cat-2314326__480.jpg",
    "https://cdn.pixabay.com/photo/2016/11/07/22/49/kitten-1807071__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/16/20/44/cat-1912330__480.jpg",
    "https://cdn.pixabay.com/photo/2016/11/06/19/42/cat-1803904__480.jpg",
    "https://cdn.pixabay.com/photo/2016/11/15/12/36/cat-1826117__480.jpg",
    "https://cdn.pixabay.com/photo/2016/03/27/16/55/cats-1283110__480.jpg",
    "https://cdn.pixabay.com/photo/2016/08/30/18/15/cat-1631648__480.jpg",
    "https://cdn.pixabay.com/photo/2017/06/11/11/14/cat-2392058__480.jpg",
    "https://cdn.pixabay.com/photo/2017/01/07/14/33/cat-1960537__480.jpg",
    "https://cdn.pixabay.com/photo/2016/10/16/10/00/cat-1744750__480.jpg",
    "https://cdn.pixabay.com/photo/2017/02/26/14/12/cat-2100306__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/05/21/51/cat-2288326__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/26/15/25/cat-2346303__480.jpg",
    "https://cdn.pixabay.com/photo/2016/09/16/19/47/cat-1674990__480.jpg",
    "https://cdn.pixabay.com/photo/2016/10/16/10/00/cat-1744749__480.jpg",
    "https://cdn.pixabay.com/photo/2017/02/03/09/26/cat-2034833__480.jpg",
    "https://cdn.pixabay.com/photo/2016/10/20/05/50/cat-1754702__480.jpg",
    "https://cdn.pixabay.com/photo/2016/11/21/11/41/animal-1844835__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/05/18/05/cat-2119283__480.jpg",
    "https://cdn.pixabay.com/photo/2017/02/02/18/18/cat-2033451__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/13/19/12/cat-1904907__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/23/15/58/cat-1927512__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/11/02/41/cat-1898659__480.jpg",
    "https://cdn.pixabay.com/photo/2016/08/16/14/40/cat-1598113__480.jpg",
    "https://cdn.pixabay.com/photo/2016/07/13/10/34/cat-1514076__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/30/17/27/cat-1941089__480.jpg",
    "https://cdn.pixabay.com/photo/2016/05/17/17/16/cat-1398627__480.jpg",
    "https://cdn.pixabay.com/photo/2016/09/18/12/29/cat-1678009__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/11/02/51/cat-1898678__480.jpg",
    "https://cdn.pixabay.com/photo/2016/07/06/13/28/cat-1500498__480.jpg",
    "https://cdn.pixabay.com/photo/2016/10/18/13/44/cat-1750241__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/19/20/28/cat-2157497__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/14/19/15/cat-2144133__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/19/22/11/cat-2157750__480.jpg",
    "https://cdn.pixabay.com/photo/2016/10/11/04/25/cat-1730517__480.jpg",
    "https://cdn.pixabay.com/photo/2017/02/23/15/06/cat-2092428__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/29/15/59/small-cat-2185670__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/05/20/08/baby-cat-2119703__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/11/02/28/cat-1898625__480.jpg",
    "https://cdn.pixabay.com/photo/2016/08/13/21/33/cat-1591598__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/11/10/34/cat-1899127__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/01/13/23/cat-1875282__480.jpg",
    "https://cdn.pixabay.com/photo/2017/01/31/19/04/cat-2026479__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/11/02/45/cat-1898667__480.jpg",
    "https://cdn.pixabay.com/photo/2016/08/12/18/34/cat-1589369__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/10/13/00/cat-1897224__480.jpg",
    "https://cdn.pixabay.com/photo/2016/10/05/15/58/cats-1716984__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/11/00/41/cat-1898510__480.jpg",
    "https://cdn.pixabay.com/photo/2016/08/13/21/53/cat-1591636__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/11/00/36/cat-1898497__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/07/22/47/cat-1890583__480.jpg",
    "https://cdn.pixabay.com/photo/2017/01/21/18/15/cat-1997911__480.jpg",
    "https://cdn.pixabay.com/photo/2016/09/20/20/47/cat-1683387__480.jpg",
    "https://cdn.pixabay.com/photo/2016/09/16/12/42/cat-1673924__480.jpg",
    "https://cdn.pixabay.com/photo/2016/06/27/10/53/cat-1482258__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/05/20/16/baby-cat-2119755__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/11/02/55/cat-1898683__480.jpg",
    "https://cdn.pixabay.com/photo/2017/03/27/21/31/cat-2180331__480.jpg",
    "https://cdn.pixabay.com/photo/2016/09/16/17/25/cat-1674617__480.jpg",
    "https://cdn.pixabay.com/photo/2016/09/17/00/53/cat-1675428__480.jpg",
    "https://cdn.pixabay.com/photo/2016/11/07/10/03/cat-1805310__480.jpg",
    "https://cdn.pixabay.com/photo/2016/05/19/21/04/cat-1403948__480.jpg",
    "https://cdn.pixabay.com/photo/2016/05/19/21/18/cat-1403970__480.jpg",
    "https://cdn.pixabay.com/photo/2016/07/08/13/10/cat-1504307__480.jpg",
    "https://cdn.pixabay.com/photo/2016/11/07/14/36/cat-1805964__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/18/18/42/kittens-1916542__480.jpg",
    "https://cdn.pixabay.com/photo/2016/03/27/19/45/animal-1283955__480.jpg",
    "https://cdn.pixabay.com/photo/2016/02/12/15/21/cat-1196242__480.jpg",
    "https://cdn.pixabay.com/photo/2016/09/24/22/20/cat-1692702__480.jpg",
    "https://cdn.pixabay.com/photo/2017/01/07/13/42/nature-1960387__480.jpg",
    "https://cdn.pixabay.com/photo/2016/09/24/23/26/cat-1692815__480.jpg",
    "https://cdn.pixabay.com/photo/2016/12/11/00/39/cat-1898503__480.jpg",
    "https://cdn.pixabay.com/photo/2016/08/23/23/08/cat-1615778__480.jpg",
    "https://cdn.pixabay.com/photo/2016/10/18/16/02/natural-1750606__480.jpg",
    "https://cdn.pixabay.com/photo/2017/02/11/22/47/cat-2058900__480.jpg",
    "https://cdn.pixabay.com/photo/2016/08/23/23/29/cat-1615825__480.jpg",
    "https://cdn.pixabay.com/photo/2016/09/17/00/51/cat-1675427__480.jpg",
    "https://cdn.pixabay.com/photo/2016/04/18/17/58/cat-1337040__480.jpg",
    "https://cdn.pixabay.com/photo/2017/01/02/19/19/cat-1947715__480.jpg",
    "https://cdn.pixabay.com/photo/2016/11/12/20/29/cat-1819685__480.jpg",
    "https://cdn.pixabay.com/photo/2016/03/29/13/12/cat-1288218__480.jpg",
    "https://cdn.pixabay.com/photo/2016/08/13/21/37/cat-1591612__480.jpg",
    "https://cdn.pixabay.com/photo/2016/08/12/18/36/cat-1589373__480.jpg",
]
cats_img_cant = len(cats_img) - 1
status = ["used", "unused"]
longitude_rang = [-0.593940, -0.616429]
latitude_rang = [38.815629, 38.826529]


def create_bikes(n):
    for i in range(n):
        bike = {"status": "used", "name": fake.name()}
        serializer = BikeSerializer(data=bike)
        if serializer.is_valid(raise_exception=True):
            serializer.save()


def create_stations(n, n_slot):
    for i in range(n):
        station = {
            "name": fake.name(),
            "status": "active",
            "image": cats_img[randint(0, cats_img_cant)],
            "longitude": np.random.uniform(longitude_rang[0], longitude_rang[1]),
            "latitude": np.random.uniform(latitude_rang[0], latitude_rang[1]),
        }
        serializer = StationSerializer(data=station)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        for j in range(n_slot):
            slot_context = {
                "station_id": serializer.data["id"],
                "status": status[randint(0, len(status) - 1)],
            }
            SlotSerializer.create_slot_filler(context=slot_context)


if __name__ == "__main__":
    print("Dummys start")
    create_bikes(50)
    create_stations(5, 5)
    print("Dummys end")
