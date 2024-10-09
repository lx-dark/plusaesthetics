CREATE TABLE IF NOT EXISTS schendulings (
    idschenduling INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    phonenumber VARCHAR(11),
    email VARCHAR(255),
    schendulingdate DATETIME
);

INSERT INTO schendulings (name, phonenumber, email, schendulingdate)
VALUES 
('Ana Silva', '987654321', 'ana.silva@mail.com', NOW()),
('Bruno Oliveira', '0123456789', 'bruno.oliveira@mail.com', NOW() + INTERVAL 1 DAY),
('Carla Souza', '987654312', 'carla.souza@mail.com', NOW() + INTERVAL 2 DAY),
('Daniel Santos', '912345678', 'daniel.santos@mail.com', NOW() + INTERVAL 3 DAY),
('Elaine Costa', '987654320', 'elaine.costa@mail.com', NOW() + INTERVAL 4 DAY),
('Felipe Pereira', '987654322', 'felipe.pereira@mail.com', NOW() + INTERVAL 5 DAY),
('Gabriela Ferreira', '987654323', 'gabriela.ferreira@mail.com', NOW() + INTERVAL 6 DAY),
('Henrique Lima', '987654324', 'henrique.lima@mail.com', NOW() + INTERVAL 7 DAY),
('Isabela Rocha', '987654325', 'isabela.rocha@mail.com', NOW() + INTERVAL 8 DAY),
('João Mendes', '987654326', 'joao.mendes@mail.com', NOW() + INTERVAL 9 DAY),
('Karen Martins', '987654327', 'karen.martins@mail.com', NOW() + INTERVAL 10 DAY),
('Lucas Alves', '987654328', 'lucas.alves@mail.com', NOW() + INTERVAL 11 DAY),
('Mariana Duarte', '987654329', 'mariana.duarte@mail.com', NOW() + INTERVAL 12 DAY),
('Nicolas Batista', '987654330', 'nicolas.batista@mail.com', NOW() + INTERVAL 13 DAY),
('Olivia Correia', '987654331', 'olivia.correia@mail.com', NOW() + INTERVAL 14 DAY),
('Pedro Gomes', '987654332', 'pedro.gomes@mail.com', NOW() + INTERVAL 15 DAY),
('Quésia Nunes', '987654333', 'quesia.nunes@mail.com', NOW() + INTERVAL 16 DAY),
('Rafael Xavier', '987654334', 'rafael.xavier@mail.com', NOW() + INTERVAL 17 DAY),
('Sara Teixeira', '987654335', 'sara.teixeira@mail.com', NOW() + INTERVAL 18 DAY),
('Thiago Azevedo', '987654336', 'thiago.azevedo@mail.com', NOW() + INTERVAL 19 DAY);
