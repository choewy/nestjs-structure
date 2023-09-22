FROM mysql:8.0
EXPOSE 3306

ADD ./db.sql /docker-entrypoint-initdb.d
ADD ./db.conf /etc/mysql/conf.d/my.cnf

CMD ["mysqld"]