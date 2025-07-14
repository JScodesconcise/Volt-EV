package com.volt.store;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClient;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoClientFactoryBean;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootApplication
public class StoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(StoreApplication.class, args);
	}

	@Bean
	CommandLineRunner pingMongo(MongoTemplate mongoTemplate) {
		return args -> {
			Document result = mongoTemplate.getDb().runCommand(new Document("ping", 1));
			System.out.println("Mongo ping response: " + result.toJson());
		};
	}
}
