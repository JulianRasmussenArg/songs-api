import json
import urllib.request
from bs4 import BeautifulSoup

# Lista de artistas a scrapear
artistas = ['The Beatles', 'Bob Dylan', 'Elvis Presley', 'The Rolling Stones', 'Aretha Franklin', 'Led Zeppelin', 'Queen', 'Michael Jackson', 'David Bowie', 'Pink Floyd', 'Jimi Hendrix', 'Stevie Wonder', 'Madonna', 'Prince', 'Nirvana', 'Radiohead', 'U2', 'James Brown', 'Frank Sinatra', 'The Beach Boys', 'The Who', 'Fleetwood Mac', 'Bob Marley & The Wailers', 'The Clash', 'Johnny Cash', 'Bruce Springsteen', 'The Velvet Underground', 'The Doors', 'Elton John', 'Miles Davis', 'The Ramones', 'The Smiths', 'Louis Armstrong', 'Ray Charles', 'The Supremes', 'Chuck Berry', 'Janis Joplin', 'Buddy Holly', 'Billie Holiday', 'Otis Redding', 'Joni Mitchell', 'Marvin Gaye', 'Neil Young', 'R.E.M.', 'Patti Smith', 'The Kinks', 'The Cure', 'Simon & Garfunkel', 'Tom Waits', 'Leonard Cohen', 'Joy Division', 'The Grateful Dead', 'Van Morrison', 'Guns N\' Roses', 'ABBA', 'The Police', 'Björk', 'Talking Heads', 'The White Stripes', 'The Stooges', 'Metallica', 'Whitney Houston', 'Bob Marley', 'Kanye West', 'The Eagles', 'Jeff Buckley', 'The Sex Pistols', 'Public Enemy', 'The Byrds', 'Santana', 'Peter Gabriel', 'Black Sabbath', 'AC/DC', 'Steely Dan', 'Cream', 'Tom Petty and the Heartbreakers', 'Pearl Jam', 'Elvis Costello', 'King Crimson', 'Smashing Pumpkins', 'Nina Simone', 'Aerosmith', 'The Allman Brothers Band', 'The Band', 'Sonic Youth', 'Depeche Mode', 'Beastie Boys', 'Rush', 'The Replacements', 'The Pogues', 'Pixies', 'Massive Attack', 'Crosby, Stills, Nash & Young', 'The Specials', 'Nine Inch Nails', 'Brian Eno', 'Lou Reed', 'The Zombies', 'Nick Drake', 'The Yardbirds']
artistasLatinos = [
  'Shakira',
  'Romeo Santos',
  'J Balvin',
  'Ozuna',
  'Daddy Yankee',
  'Maluma',
  'Enrique Iglesias',
  'Nicky Jam',
  'Juan Luis Guerra',
  'Carlos Vives',
  'Bad Bunny',
  'Marc Anthony',
  'Luis Fonsi',
  'Alejandro Sanz',
  'Thalía',
  'Jennifer Lopez',
  'Gloria Estefan',
  'Ricardo Arjona',
  'Maná',
  'Luis Miguel',
  'Gente de Zona',
  'Marco Antonio Solís',
  'Prince Royce',
  'Juan Gabriel',
  'Celia Cruz',
  'Selena',
  'Vicente Fernández',
  'Ana Gabriel',
  'José José',
  'Lila Downs',
  'Los Tigres del Norte',
  'Pedro Infante',
  'Chayanne',
  'Roberto Carlos',
  'Camila Cabello',
  'Pitbull',
  'Cher',
  'Christina Aguilera',
  'Ricky Martin',
  'Gloria Trevi',
  'Paulina Rubio',
  'RBD',
  'Kany García',
  'Lucero',
  'Luciano Pavarotti',
  'José Feliciano',
  'Plácido Domingo',
  'Luisa Fernanda W',
  'Reik',
  'Laura Pausini',
  'Rocío Dúrcal',
  'Daniela Romo',
  'Gloria Gaynor',
  'Natalia Lafourcade',
  'Pablo Alborán',
  'Farruko',
  'Wisin & Yandel',
  'Rakim y Ken-Y',
  'Don Omar',
  'Tito Puente',
  'Joaquín Sabina',
  'Diego Torres',
  'Julieta Venegas',
  'Ana Torroja',
  'Cristian Castro',
  'Mijares',
  'Jenni Rivera',
  'Los Bukis',
  'Emmanuel',
  'Banda MS',
  'Los Ángeles Azules',
  'Intocable',
  'Los Temerarios',
  'Bronco',
  'La Arrolladora Banda El Limón',
  'Los Tucanes de Tijuana',
  'Calibre 50',
  'El Gran Combo de Puerto Rico',
  'Celia Cruz',
  'Molotov',
  'Los Fabulosos Cadillacs',
  'Juanes',
  'Andrés Calamaro',
  'Café Tacvba',
  'Manu Chao',
  'Zoé',
  'Soda Stereo',
  'Los Enanitos Verdes',
  'Enanitos Verdes',
  'Sergio Dalma',
  'Mecano',
  'La Oreja de Van Gogh',
  'Pimpinela',
  'Ha*Ash',
  'Sin Bandera',
  'Jesse & Joy',
  'Río Roma',
  'Reyli',
  'Kany García',
  'Chambao',
  'Rosana',
  'Estopa',
  'El Canto del Loco',
  'Antonio Orozco',
  'Fito y Fitipaldis']

# Iterar sobre cada artista
for i in range(len(artistas)):
    artistas[i] = artistas[i].lower().replace(' ', '-')
for artista in artistas:
    try:
        print(f'Obteniendo {artista}')
        # URL de la página web del artista
        url = f'https://www.letras.mus.br/{artista}/'
        songs_list = []

        # Realizar una solicitud GET a la página web
        req = urllib.request.urlopen(url)

        # Utilizar BeautifulSoup para analizar el HTML de la página web
        soup = BeautifulSoup(req.read(), 'html.parser')

        song_list = soup.find('ol', class_='js-song-list')

        # Crear archivo SQL para guardar los INSERTs del artista
        with open(f'{artista}.sql', 'w') as f:

            # Iteramos sobre cada elemento de la lista de canciones
            for song in song_list.find_all('li', class_='-song'):
                data = {}
                artist = song['data-artist'].lower().replace(" ", "-")
                url = song['data-url']
                data['artist'] = song['data-artist']
                data['title'] = song['data-name']
                data['url'] = f'https://www.letras.mus.br/{artist}/{url}/'
                songs_list.append(data)

            for song in songs_list:
                lyrics_list = []
                url_song = song['url']
                req_song = urllib.request.urlopen(url_song)
                soup = BeautifulSoup(req_song.read(), 'html.parser')
                lyrics_element = soup.find('div', class_='cnt-letra')
                lyrics = [line.replace("'", '').replace('"', '') for line in lyrics_element.stripped_strings]
                lyrics_list.append(song['artist'])
                lyrics_list.append(song['title'])
                lyrics_list.append(json.dumps(lyrics))
                sql = "INSERT INTO song (artist, name, lyrics) VALUES ('{}', '{}', '{}');\n".format(lyrics_list[0], lyrics_list[1], lyrics_list[2])
                f.write(sql)
    except Exception as e:
        print(f'Error al procesar {artista}: {e}')
        continue
