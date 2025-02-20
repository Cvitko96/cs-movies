1. Pokretanje lokalno:

      > npm install
      > npm run dev

2. Pokretanje putem dockera:

- Izgradnja Docker imagea:

  Prvo, u terminalu izvršite sljedeću naredbu kako biste izgradili Docker image:

      > docker build -t cs-movie .

Ova naredba kreira Docker image s nazivom cs-movie na temelju Dockerfile-a u trenutnom direktoriju.

- Pokretanje kontejnera:

  Nakon što je image izgrađen, možete ga pokrenuti na željenom portu. Na primjer, za pokretanje aplikacije na portu 3000, koristite:

      > docker run -d -p 3000:3000 --name cs-movie cs-movie
