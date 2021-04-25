FROM mongo

COPY timetables.json /timetables.json

CMD mongoimport --host mongodb --jsonArray --db dentist-reservation --collection timetables --file timetables.json