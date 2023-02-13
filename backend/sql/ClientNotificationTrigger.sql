delimiter //
CREATE TRIGGER incidents_incident_AU
AFTER UPDATE ON incidents_incident
FOR EACH ROW
BEGIN
IF NEW.status = 'in_progress' THEN
INSERT INTO incidents_notification (body, user_id, seen, created_at, modified_at) VALUES (CONCAT('The incidence: ', OLD.slug, ' is in progress.'), OLD.user_id, FALSE, NOW(), NOW());
END IF;
IF NEW.status = 'resolved' THEN INSERT INTO incidents_notification (body, user_id, seen, created_at, modified_at) VALUES 
(CONCAT('The incidence: ', OLD.slug, ' is resolved.'), OLD.user_id, FALSE, NOW(), NOW());
END IF;
END//
delimiter ;