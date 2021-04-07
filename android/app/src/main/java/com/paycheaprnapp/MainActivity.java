package com.paycheaprnapp;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
public class MainActivity extends ReactActivity {



    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "PayCheapRnApp";
    }
/*
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        try {
            Intent intent = getIntent();
            intent.setAction(intent.getAction());
            Uri uri = intent.getData();
            intent.setData(uri);
            startActivityForResult(intent, 0);
        } catch (Exception e) {
            //若无法正常跳转，在此进行错误处理
            Toast.makeText(MainActivity.this, "无法跳转到微信，请检查您是否安装了微信！", Toast.LENGTH_SHORT).show();
        }

    }
*/

}
