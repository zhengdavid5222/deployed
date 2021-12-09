package MavenProject;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;



public class ServerForwarding {
public static void main(String[] args) {

try {	
Class.forName("org.postgresql.Driver");	
String url = "jdbc:postgresql://localhost:5433/TestDatabase";
String urlZennerUSA = "jdbc:postgresql://10.1.9.32:5432/zkmtest";
Properties props = new Properties();
Properties propZennerUSA = new Properties();
propZennerUSA.setProperty("user","postgres");
propZennerUSA.setProperty("password","zltd:admin");
props.setProperty("user","postgres");
props.setProperty("password","Dragon123!");
String query = "SELECT nodeid, gatewayid FROM nodes WHERE nodeid=20003;"
        + "SELECT nodeid, data0 FROM datasamples WHERE nodeid=20048;"
        + "SELECT nodeid, alarms FROM alarms WHERE nodeid=20531";



try(Connection con = DriverManager.getConnection(url, props); 
    
	PreparedStatement pst = con.prepareStatement(query)) {
    boolean isResult = pst.execute();

    do {
        try (ResultSet rs = pst.getResultSet()) {

            while (rs.next()) {
            
                System.out.print(rs.getInt(1));
                System.out.print(": ");
                System.out.println(rs.getString(2));
            }

            isResult = pst.getMoreResults();
        }
    } while (isResult);
    Statement st = con.createStatement();
    ResultSet rs = st.executeQuery("SELECT VERSION()"); {
    	if (rs.next()) {
            System.out.println(rs.getString(1));
        }
    }
} 

System.out.println("ZennerUSA");

System.out.println("ZennerUSA:ZennerUSA");

try(Connection con = DriverManager.getConnection(urlZennerUSA, propZennerUSA); 
		
	PreparedStatement pst = con.prepareStatement(query)) {

    boolean isResult = pst.execute();

    do {
        try (ResultSet rs = pst.getResultSet()) {

            while (rs.next()) {
            
                System.out.print(rs.getInt(1));
                System.out.print(": ");
                System.out.println(rs.getString(2));
            }

            isResult = pst.getMoreResults();
        }
    } while (isResult);
    Statement st = con.createStatement();
    ResultSet rs = st.executeQuery("SELECT VERSION()"); {
    	if (rs.next()) {
            System.out.println(rs.getString(1));
        }
    }
//} 

} catch (Exception e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
}catch (Exception e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
}}