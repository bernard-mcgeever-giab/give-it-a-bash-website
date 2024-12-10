# Build an API with Complex Relationships

This guide will walk you through building a RESTful API that can handle complex entity relationships. We’ll cover designing the relationships, implementing them in code, and testing the API to ensure it works as expected. The API should:

1. Model one-to-one, one-to-many, and many-to-many relationships in JPA.
2. Write CRUD operations for these relationships.
3. Unit test and integration test your API.

## Task Overview
The task is to:

- Design an API for managing a set of complex class objects.
- Incorporate the following types of relationships between your entities:
    - One-to-One
    - One-to-Many
    - Many-to-Many
- Write unit and integration tests to validate the API.

For this guide, we’ll use the example of X-Men’s School for Gifted Children. This API models the school's operations, including students, teachers, subjects, and lessons.

## Technologies you’ll need:
- Spring Boot: For building the REST API.
- JPA (Hibernate): For managing database relationships.
- H2 Database: An in-memory database for testing.

## Useful Resources
Here are some great resources to get started with the tools:

- [Building REST Services with Spring](https://spring.io/guides/gs/rest-service/)
- [One-to-One Relationship in JPA](https://www.baeldung.com/jpa/one-to-one)
- [Hibernate One-to-Many](https://www.baeldung.com/hibernate/one-to-many)
- [Many-To-Many Relationship in JPA](https://www.baeldung.com/hibernate/many-to-many)
- [Unit Testing with Spring Boot](https://www.baeldung.com/spring-boot/testing)
- [Testing in Spring Boot](https://www.baeldung.com/spring-boot/testing)

## Example Project

### Step 1: Setting Up Your Project

To get started, create a new Spring Boot project. You can do this using [Spring Initializr](https://start.spring.io/) or by using your IDE's new project wizard.

Make sure to include the following dependencies:
- Spring Web
- Spring Data JPA
- H2 Database
- Spring Boot DevTools (optional, for hot-reloading)

### Step 2: Designing the Entities

#### Entity Overview

We’ll create a system with the following relationships:

##### One-to-One:

- Each mutant has one unique power (e.g., Wolverine ↔ Healing Factor).

##### One-to-Many:

- A school has many students, teachers, subjects, and facilities.
- A teacher can teach multiple lessons.
- A student can earn multiple achievements.

##### Many-to-Many:

- Students attend multiple lessons, and each lesson can have multiple students.
- Teachers specialize in multiple subjects, and each subject can have multiple teachers.

### Step 3: Implementing the Entities
Here’s how you can model these relationships in JPA:

#### One-to-One Example: Mutant ↔ Power
```java
@Entity
public class Mutant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "power_id", referencedColumnName = "id")
    private Power power;

    private String name;
    // Getters and setters
}

@Entity
public class Power {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    // Getters and setters
}
```

#### One-to-Many Example: SchoolData ↔ Student
```java
@Entity
public class SchoolData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "schoolData", cascade = CascadeType.ALL)
    private List<Student> students;

    private String name;
    // Getters and setters
}

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "school_data_id")
    private SchoolData schoolData;

    private String firstName;
    private String lastName;
    // Getters and setters
}
```

#### Many-to-Many Example: Student ↔ Lesson
```java
@Entity
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(mappedBy = "lessons")
    private List<Student> students;

    private String topic;
    // Getters and setters
}

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(
        name = "student_lesson",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "lesson_id")
    )
    private List<Lesson> lessons;

    private String firstName;
    private String lastName;
    // Getters and setters
}
```

### Step 4: Writing the Repository and Services

Use Spring Data JPA repositories for database interactions.
Write services to handle CRUD operations, ensuring business logic stays out of the controller layer.
Example of a StudentService:

```java
@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
```
### Step 5: Writing the Controller

Here’s how you can create the controller to handle API requests:

```java
@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student createdStudent = studentService.createStudent(student);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentService.getStudentById(id);
        return student.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Student updatedStudent = studentService.updateStudent(id, student);
        return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
```

### Step 6: Writing Unit and Integration Tests

#### Unit Tests

Unit tests verify the functionality of individual components (like services) in isolation. Use @MockBean to mock dependencies.

Example of a unit test for the StudentService:

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class StudentServiceTests {
    @MockBean
    private StudentRepository studentRepository;

    @Autowired
    private StudentService studentService;

    @Test
    public void testCreateStudent() {
        Student student = new Student("John", "Doe");
        when(studentRepository.save(any(Student.class))).thenReturn(student);

        Student result = studentService.createStudent(student);
        assertNotNull(result);
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());
    }
}
```

#### Integration Tests

Integration tests verify the interaction between components, like controllers and services, using the real database or an in-memory database like H2.

Example of an integration test for the StudentController:

```java
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class StudentControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testCreateStudent() throws Exception {
        String studentJson = "{\"firstName\":\"John\", \"lastName\":\"Doe\"}";
        mockMvc.perform(post("/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(studentJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"));
    }
}
```

### Step 7: Extending the API

Once the basic CRUD operations are in place, consider adding features such as:

- Timetables: Allow students to select lessons and detect scheduling conflicts.
- Achievements: Track and display student achievements.

> **Note:** A working example can be found on my GitHub account [here](https://github.com/bernard-mcgeever-giab/application-programming-interface).

