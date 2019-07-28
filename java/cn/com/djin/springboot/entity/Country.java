package cn.com.djin.springboot.entity;


//部门实体类对象
public class Country {

    //部门编号
    private Integer leader;

    //部门名称
    private String dname;

    //部门地址
    private String loc;


    @Override
    public String toString() {
        return "Country{" +
                "did=" + leader +
                ", dname='" + dname + '\'' +
                ", loc='" + loc + '\'' +
                '}';
    }

    public Integer getLeader() {
        return leader;
    }

    public void setLeader(Integer leader) {
        this.leader = leader;
    }

    public String getDname() {
        return dname;
    }

    public void setDname(String dname) {
        this.dname = dname;
    }

    public String getLoc() {
        return loc;
    }

    public void setLoc(String loc) {
        this.loc = loc;
    }
}
