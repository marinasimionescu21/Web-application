package ro.pweb.myspringapi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "contract")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Integer residentCode;

    private int billCode;

    @OneToOne(mappedBy = "contract")
    private Resident resident;

    @OneToOne(mappedBy = "contract")
    private User user;

    @ManyToOne
    @JoinColumn(name = "cod_bill",insertable = false, updatable = false)
    private Bill bill;

    public Contract() {
    }

    public Contract(int id, Integer residentCode, int billCode, Resident resident, User user, Bill bill) {
        this.id = id;
        this.residentCode = residentCode;
        this.billCode = billCode;
        this.resident = resident;
        this.user = user;
        this.bill = bill;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getResidentCode() {
        return residentCode;
    }

    public void setResidentCode(Integer residentCode) {
        this.residentCode = residentCode;
    }

    public int getBillCode() {
        return billCode;
    }

    public void setBillCode(int billCode) {
        this.billCode = billCode;
    }

    public Resident getResident() {
        return resident;
    }

    public void setResident(Resident resident) {
        this.resident = resident;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }
}
