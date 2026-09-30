import models
from sqlalchemy.orm import Session

def seed_data():
    db = models.SessionLocal()
    
    # 1. Ensure User 1 exists
    user = db.query(models.User).filter(models.User.id == 1).first()
    if not user:
        user = models.User(username="demo_user", hashed_password="demo_hash_xyz_890")
        db.add(user)
        db.commit()
        db.refresh(user)

    # 2. Check if data already exists to avoid duplicates
    if db.query(models.Skill).count() == 0:
        print("Adding sample skills...")
        skill1 = models.Skill(name="Cloud Computing", category="Tech", target_hours=50.0, user_id=user.id)
        skill2 = models.Skill(name="Guitar", category="Music", target_hours=100.0, user_id=user.id)
        db.add_all([skill1, skill2])
        db.commit()

        print("Adding sample practice sessions...")
        session1 = models.PracticeSession(skill_id=skill1.id, duration_minutes=120, notes="Set up FastAPI and React")
        session2 = models.PracticeSession(skill_id=skill1.id, duration_minutes=60, notes="Studied AWS architecture")
        session3 = models.PracticeSession(skill_id=skill2.id, duration_minutes=45, notes="Practiced basic chords")
        db.add_all([session1, session2, session3])
        db.commit()

        print("Adding sample community posts...")
        post1 = models.Post(content="Finally got my full-stack Cloud Computing project running without errors! 🚀", user_id=user.id)
        post2 = models.Post(content="Learned 3 new guitar chords today! 🎸", user_id=user.id)
        db.add_all([post1, post2])
        db.commit()

        print("✅ Database successfully seeded with dummy data!")
    else:
        print("⚠️ Data already exists in the database. Go check your browser!")

    db.close()

if __name__ == "__main__":
    seed_data()