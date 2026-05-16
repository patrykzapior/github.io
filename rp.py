import requests

import json

import locale

 

cookies = {
    'usersessionid': '43a1p64gue3gdwvp36739vxb83uxfjfn:eyJfc3RvcmVkIjp0cnVlLCJfZ19zZXNzaW9uX2tleSI6ImI3SHZneXpsZ1dJTkg5cTV2bllIdmZ6d096WmpkTmxyUzhqZWhQeHptb2MifQ:1vx3ZF:SEP9qnioq_hzhze25HST9LH8ln5HGGXhH6I7IttDuP4',
    'mp-csrftoken': 'pSoPkQW6mEzBuzFt59jWFYXa0YwU0VJT',
    'last_region': '8647',
    'csrftoken': 'mbz8UEX5yBU13LQdR4fdq2TPQDtqYfzm',
    '__gtm_referrer': 'https%3A%2F%2Fkontomieszkaniowe.pl%2F',
    'sceuidjs': 'e5e7e081-e1ba-4f91-8069-5a09a5fe1351',
    'lantern': '0217baf8-1620-47f7-8d18-cd33088cf379',
    '__ca__chat': 'xzokp8bdcixx',
    '_fbp': 'fb.1.1772449153844.1372334241',
    '_gtmeec': 'eyJjdCI6IjM5ZTM5MWViYzYwZmYyNGY3NTAzNDQ3NzE4MjRhMTQyYTY1YzM3MjhmZDczMmYzYmQ0YWM1N2M1NjFmMWZjYWUiLCJzdCI6IjM0ODU2MzlmYWYxNTkxZjNjMTZmMjk1MTk4ZTkzODlkYjViMzNjOTQ5NTg3ZWM0ODY2MzU5N2Q0ZTAwMjk5ZDUiLCJ6cCI6ImZiNDdkYTBkOGQ2OTUwZWQwYzIyZGVmN2FjMGUxNDIyZWY5ZWVhYWFiNzdjMjllNzNhOWE1Nzg2MTM1MjBjNjIiLCJjb3VudHJ5IjoiMzQ4NTYzOWZhZjE1OTFmM2MxNmYyOTUxOThlOTM4OWRiNWIzM2M5NDk1ODdlYzQ4NjYzNTk3ZDRlMDAyOTlkNSIsImV4dGVybmFsX2lkIjoiNTEzNzJmNzgyOGUzMzQ4ZWEyYzE1NTU4NzdmMDAwOTlkNTk5NDZjZmY0MzEzN2IxYzVjZGY3ZWM4YjU0MGViYiJ9',

    '_dcid': 'dcid.1.1772449169864.578660112',

    'FPAU': '1.2.782851715.1772449170',

    'CookieConsent': '{stamp:%27BTmFYP00zQxIfipNkN4Go35jqBjhMH4St/wyO4IbSHJ0hW/DgMwx9Q==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1772449172559%2Cregion:%27pl%27}',

    '_gcl_au': '1.1.2093884097.1772449175',

    '_ga': 'GA1.1.883421367.1772449171',

    '_ga_Q3VMGFSEYZ': 'GS2.1.s1772457070$o2$g1$t1772459054$j43$l0$h1737981990',

    '_ga_SF82F7952X': 'GS2.1.s1772457073$o2$g1$t1772459052$j60$l0$h0',

    'FPID': 'FPID2.2.PWdmCeMMhQ0tjJGINoGoxZKGuRDtuXa9j8nGOwN%2FrNs%3D.1772449171',

    'FPLC': 'C0PKR2tGBYFgc%2Fz4L7LTXUofpZUCETNx652HDe4B83Aj2gt7AdMBnxVk4BtRNSTNUdJMzFMfsH3RA8hx6M7WE3LgW0piB%2FthxDQwZC14kASS8gryKcpis%2F%2FIID%2Bi%2Bw%3D%3D',

    '__rtbh.uid': '%7B%22eventType%22%3A%22uid%22%2C%22id%22%3A%22cc2b67f9-971e-4fd9-a858-63d1085126c7%22%2C%22expiryDate%22%3A%222027-03-02T13%3A40%3A24.255Z%22%7D',

    '__rtbh.lid': '%7B%22eventType%22%3A%22lid%22%2C%22id%22%3A%22IdMNk9wD7znYAlMG8Vj9%22%2C%22expiryDate%22%3A%222027-03-02T13%3A40%3A24.255Z%22%7D',

    '_clck': 'e6rk2b%5E2%5Eg40%5E1%5E2252',

    '_clsk': '10lc413%5E1772459052620%5E7%5E1%5Ev.clarity.ms%2Fcollect',

    'analyticssessionid': 'ca4f766db8801dffc307669955985c78',

    'pageviewCount': '3',

    '_gcl_au_backup': '1.1.2093884097.1772449175',

    '_ga_backup': 'GA1.1.883421367.1772449171',

    '_fbp_backup': 'fb.1.1772449153844.1372334241',

    '_ga_Q3VMGFSEYZ_backup': 'GS2.1.s1772457070$o2$g1$t1772459052$j45$l0$h1737981990',

    'storagessessionid': '5939069279d693e143a6b770aa929d18',

    '_uetsid': '01842690162711f1a2e5e343e54e39de|b3wkde|2|g40|1|2252',

    'FPGSID': '1.1772459037.1772459037.G-Q3VMGFSEYZ.8dkSfzZNS2qWPEIzLFMVjQ',

    '_uetvid': '01849010162711f191800fb176cc5bff|18u6c72|1772459052621|7|1|bat.bing.com/p/insights/c/v',

}

 

headers = {

    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0',

    'Accept': 'application/json',

    'Accept-Language': 'pl,en-US;q=0.9,en;q=0.8',

    # 'Accept-Encoding': 'gzip, deflate, br, zstd',

    'Content-Type': 'application/json',

    'Connection': 'keep-alive',

    'Referer': 'https://rynekpierwotny.pl/s/nowe-mieszkania-krakow-cena-do-1499999-zl-powierzchnia-od-70-m2/?page=2',

    # 'Cookie': 'usersessionid=43a1p64gue3gdwvp36739vxb83uxfjfn:eyJfc3RvcmVkIjp0cnVlLCJfZ19zZXNzaW9uX2tleSI6ImI3SHZneXpsZ1dJTkg5cTV2bllIdmZ6d096WmpkTmxyUzhqZWhQeHptb2MifQ:1vx3ZF:SEP9qnioq_hzhze25HST9LH8ln5HGGXhH6I7IttDuP4; mp-csrftoken=pSoPkQW6mEzBuzFt59jWFYXa0YwU0VJT; last_region=8647; csrftoken=mbz8UEX5yBU13LQdR4fdq2TPQDtqYfzm; __gtm_referrer=https%3A%2F%2Fkontomieszkaniowe.pl%2F; sceuidjs=e5e7e081-e1ba-4f91-8069-5a09a5fe1351; lantern=0217baf8-1620-47f7-8d18-cd33088cf379; __ca__chat=xzokp8bdcixx; _fbp=fb.1.1772449153844.1372334241; _gtmeec=eyJjdCI6IjM5ZTM5MWViYzYwZmYyNGY3NTAzNDQ3NzE4MjRhMTQyYTY1YzM3MjhmZDczMmYzYmQ0YWM1N2M1NjFmMWZjYWUiLCJzdCI6IjM0ODU2MzlmYWYxNTkxZjNjMTZmMjk1MTk4ZTkzODlkYjViMzNjOTQ5NTg3ZWM0ODY2MzU5N2Q0ZTAwMjk5ZDUiLCJ6cCI6ImZiNDdkYTBkOGQ2OTUwZWQwYzIyZGVmN2FjMGUxNDIyZWY5ZWVhYWFiNzdjMjllNzNhOWE1Nzg2MTM1MjBjNjIiLCJjb3VudHJ5IjoiMzQ4NTYzOWZhZjE1OTFmM2MxNmYyOTUxOThlOTM4OWRiNWIzM2M5NDk1ODdlYzQ4NjYzNTk3ZDRlMDAyOTlkNSIsImV4dGVybmFsX2lkIjoiNTEzNzJmNzgyOGUzMzQ4ZWEyYzE1NTU4NzdmMDAwOTlkNTk5NDZjZmY0MzEzN2IxYzVjZGY3ZWM4YjU0MGViYiJ9; _dcid=dcid.1.1772449169864.578660112; FPAU=1.2.782851715.1772449170; CookieConsent={stamp:%27BTmFYP00zQxIfipNkN4Go35jqBjhMH4St/wyO4IbSHJ0hW/DgMwx9Q==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1772449172559%2Cregion:%27pl%27}; _gcl_au=1.1.2093884097.1772449175; _ga=GA1.1.883421367.1772449171; _ga_Q3VMGFSEYZ=GS2.1.s1772457070$o2$g1$t1772459054$j43$l0$h1737981990; _ga_SF82F7952X=GS2.1.s1772457073$o2$g1$t1772459052$j60$l0$h0; FPID=FPID2.2.PWdmCeMMhQ0tjJGINoGoxZKGuRDtuXa9j8nGOwN%2FrNs%3D.1772449171; FPLC=C0PKR2tGBYFgc%2Fz4L7LTXUofpZUCETNx652HDe4B83Aj2gt7AdMBnxVk4BtRNSTNUdJMzFMfsH3RA8hx6M7WE3LgW0piB%2FthxDQwZC14kASS8gryKcpis%2F%2FIID%2Bi%2Bw%3D%3D; __rtbh.uid=%7B%22eventType%22%3A%22uid%22%2C%22id%22%3A%22cc2b67f9-971e-4fd9-a858-63d1085126c7%22%2C%22expiryDate%22%3A%222027-03-02T13%3A40%3A24.255Z%22%7D; __rtbh.lid=%7B%22eventType%22%3A%22lid%22%2C%22id%22%3A%22IdMNk9wD7znYAlMG8Vj9%22%2C%22expiryDate%22%3A%222027-03-02T13%3A40%3A24.255Z%22%7D; _clck=e6rk2b%5E2%5Eg40%5E1%5E2252; _clsk=10lc413%5E1772459052620%5E7%5E1%5Ev.clarity.ms%2Fcollect; analyticssessionid=ca4f766db8801dffc307669955985c78; pageviewCount=3; _gcl_au_backup=1.1.2093884097.1772449175; _ga_backup=GA1.1.883421367.1772449171; _fbp_backup=fb.1.1772449153844.1372334241; _ga_Q3VMGFSEYZ_backup=GS2.1.s1772457070$o2$g1$t1772459052$j45$l0$h1737981990; storagessessionid=5939069279d693e143a6b770aa929d18; _uetsid=01842690162711f1a2e5e343e54e39de|b3wkde|2|g40|1|2252; FPGSID=1.1772459037.1772459037.G-Q3VMGFSEYZ.8dkSfzZNS2qWPEIzLFMVjQ; _uetvid=01849010162711f191800fb176cc5bff|18u6c72|1772459052621|7|1|bat.bing.com/p/insights/c/v',

    'Sec-Fetch-Dest': 'empty',

    'Sec-Fetch-Mode': 'cors',

    'Sec-Fetch-Site': 'same-origin',

    # Requests doesn't support trailers

    # 'TE': 'trailers',

}

 

params = {

    's': 'offer-list',

    'area_0': '70',

    'country': '1',

    'display_type': '1',

    'distance': '5',

    'for_sale': 'true',

    'include_pre_sale': 'true',

    'limited_presentation': 'false',

    'page': '1',

    'page_size': '24',

    'price_1': '1499999',

    'region': '11158',

    'show_on_listing': 'true',

    'sort': '',

    'type': '1',

}

 

response = requests.get('https://rynekpierwotny.pl/api/v2/offers/offer/', params=params, cookies=cookies, headers=headers)

 

#print(f"status połączenia: (Code) {response.status_code}")

 

try:

  data = response.json()

except requests.exceptions.JSONDecodeError:

  print(response.text[:500])

 

lista_ofert = data.get('results', [])

 

podsumowanie = []

test = []

 

for oferta in lista_ofert:

  group = oferta.get('groups',{})

  if group is None:
    name = oferta.get('name')
  else:
    name = group.get('name')

  vendor = oferta.get('vendor',{}).get('name')
  region = oferta.get('region',{}).get('name')
  adres = oferta.get('address')
  ulica = oferta.get('street_name')
  numer = oferta.get('street_number')
  stats_ranges_area_max = oferta.get('stats',{}).get('ranges_area_max')
  stats_ranges_area_min = oferta.get('stats',{}).get('ranges_area_min')
  ranges_price_m2_max   = oferta.get('stats',{}).get('ranges_price_m2_max')
  ranges_price_m2_min   = oferta.get('stats',{}).get('ranges_price_m2_min')
  ranges_price_max      = oferta.get('stats',{}).get('ranges_price_max')
  ranges_price_min      = oferta.get('stats',{}).get('ranges_price_min')

  podsumowanie.append({

    'Nazwa'            : name,
    'Deweloper'        : vendor,
    'Dzielnica'        : region,
    'Adres'            : adres,
    'Ulica'            : ulica+' '+numer,
    'Metraże od'       : str(f'{stats_ranges_area_min:,.0f}')+' m2',
    'Metraże do'       : str(f'{stats_ranges_area_max:,.0f}')+' m2',
    'Cena za M2 od'    : str(f'{ranges_price_m2_min:,.0f}')+ ' PLN za m2',
    'Cena za M2 do'    : str(f'{ranges_price_m2_max:,.0f}')+ ' PLN za m2',
    'Ceny od'          : str(f'{ranges_price_min:,.0f}')+ ' PLN',
    'Ceny do'          : str(f'{ranges_price_max:,.0f}')+ ' PLN',
  })

  test.append({
    f'Nazwa {name}',
    f'metraże od {stats_ranges_area_min} m2'
  })

print(f'Liczba ofert na stronie: {len(podsumowanie)}.')
print(f"Strona numer: {params['page']}")

for i in range(5):
  ladnyJson2 = json.dumps(podsumowanie[i], indent=2, ensure_ascii=False)
  print(ladnyJson2)