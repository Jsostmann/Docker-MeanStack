FROM mysql:8.0.2
ENV MYSQL_DATABASE demodb
ENV MYSQL_ROOT_PASSWORD root
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
EXPOSE 3306