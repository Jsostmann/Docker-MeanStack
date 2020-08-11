
show tables;

CREATE TABLE USER (
   USER_ID INT NOT NULL AUTO_INCREMENT,
   userName VARCHAR(100) NOT NULL,
   userPass VARCHAR(100) NOT NULL,
   firstName VARCHAR(100) NOT NULL,
   lastName VARCHAR(100) NOT NULL,
   age INT,
   PRIMARY KEY ( USER_ID )
   );
   
show tables;