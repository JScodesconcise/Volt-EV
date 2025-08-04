package com.volt.store.reports;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsageLogRepository extends MongoRepository<UsageLog, String> {
}
