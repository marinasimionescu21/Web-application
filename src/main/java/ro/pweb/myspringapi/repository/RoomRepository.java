package ro.pweb.myspringapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.pweb.myspringapi.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
}
