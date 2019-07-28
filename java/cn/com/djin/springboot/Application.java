package cn.com.djin.springboot;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 *   项目的启动类
 */
/*@Configuration  //读取默认配置
@EnableAutoConfiguration   //手动读取
@ComponentScan  //扫描器*/
@SpringBootApplication(scanBasePackages = "cn.com.djin.springboot.*")  // same as @Configuration @EnableAutoConfiguration @ComponentScan
@MapperScan("cn.com.djin.springboot.mapper")//mapper映射文件的扫描可以指定扫描位置

public class Application {

    /**
     *   项目的启动方法
     * @param args
     */
    public static void main(String[] args) {
        //配置热部署
      //  System.setProperty("spring.devtools.restart.enabled", "false");
        SpringApplication.run(Application.class, args);
    }
}
